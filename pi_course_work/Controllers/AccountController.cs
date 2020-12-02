using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using pi_course_work.Database.Models;
using pi_course_work.HttpModels;
using pi_course_work.Database.Repositories.Interfaces;
using System.Diagnostics;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using pi_course_work.StaticFields;
using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;
using pi_course_work.Auth;
using Microsoft.IdentityModel.Tokens;

namespace pi_course_work.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IUnitOfWork db;

        public AccountController(IUnitOfWork context)
        {
            this.db = context;
        }

        #region Authorize methods

        [Authorize]
        [HttpGet("me")]
        public string AccMe()
        {
            ClaimsIdentity ident = HttpContext.User.Identity as ClaimsIdentity;

            return JsonConvert.SerializeObject(
                    new
                    {
                        userData = new AccountMeInfo(
                            Int32.Parse(User.Claims.Where(c => c.Type == "userId").Select(c => c.Value).SingleOrDefault()),
                            ident.Claims.Where(c => c.Type == ident.NameClaimType).Select(v => v.Value).SingleOrDefault(),
                            ident.Claims.Where(c => c.Type == ClaimsIdentity.DefaultRoleClaimType).Select(v => v.Value).SingleOrDefault(),
                            Int32.Parse(User.Claims.Where(c => c.Type == "schoolId").Select(c => c.Value).SingleOrDefault())),

                        HttpResults.successRequest.error,
                        HttpResults.successRequest.result
                    }
                );
        }

        #endregion

        #region Anonymous methods

        [AllowAnonymous]
        [HttpPost("login")]
        public RequestResult Login([FromBody] SignInData data)
        {
            CRMFather father = new CRMFather(data.login, data.password);
            int idFather = 0;

            if (db.CrmFathers.canLogin(father, out idFather))
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, data.login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, Roles.FATHER_ROLE),
                    new Claim("userId", idFather.ToString()),
                    new Claim("schoolId", db.School.GetSchoolId(idFather).ToString())
                };

                ClaimsIdentity cd = new ClaimsIdentity(claims, "ApplicationCookie");

                var now = DateTime.UtcNow;
                var jwt = new JwtSecurityToken(
                        issuer: AuthOptions.ISSUER,
                        audience: AuthOptions.AUDIENCE,
                        notBefore: now,
                        claims: cd.Claims,
                        expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                        signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                HttpContext.Response.Cookies.Append(
                    ".AspNetCore.Application.Id",
                    encodedJwt,
                    new CookieOptions { MaxAge = TimeSpan.FromMinutes(60) });

                return HttpResults.successRequest;
            }
            
            return HttpResults.badLoginRequest;
        }

        [AllowAnonymous]
        [HttpPost("registration")]
        public RequestResult Registration([FromBody] RegistrationData data)
        {
            try
            {
                if (db.School.isExist(data.schoolName) || db.CrmFathers.isExist(data.login))
                {
                    return HttpResults.badRegisterRequest;
                }
                var father = new CRMFather(data.login, data.password);
                int idFather = db.CrmFathers.Add(father);
                var school = new School(idFather, data.schoolName, data.location);

                db.School.Add(school);
            }
            catch (Exception e)
            {
                Debug.WriteLine(e);
                return HttpResults.badRequest;
            }

            return HttpResults.successRequest;
        }

        [HttpDelete("logout")]
        public RequestResult Logout()
        {
            foreach (var cookie in HttpContext.Request.Cookies)
            {
                Debug.WriteLine(cookie.Key);
                Response.Cookies.Delete(cookie.Key);
            }
            return HttpResults.successRequest;
        }

        [AllowAnonymous]
        [HttpGet("unauthorized")]
        public RequestResult UnauthorizedException()
        {
            Debug.WriteLine("unauthorized");
            return HttpResults.unauthorizedRequest;
        }

        #endregion

        #region Help method


        private ClaimsIdentity GetIdentity(string login, string password)
        {
            CRMFather father = db.CrmFathers.GetFather(login, password);
            MemberAccount member = null;

            List<Claim> claims;
            if (father == null)
            {
                member = db.MembersAccounts.GetAccount(login, password);

                if (member == null)
                {
                    return null;
                }

                claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, member.login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, member.role),
                    new Claim("id", member.id.ToString())
                };
            }
            else
            {
                claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, father.father),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, "Father"),
                    new Claim("id", father.id.ToString())
                };
            }

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

            return claimsIdentity;
        }

        #endregion
    }
}