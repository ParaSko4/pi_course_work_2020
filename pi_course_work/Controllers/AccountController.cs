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

        [Authorize]
        [HttpGet("me")]
        public string GetUserInfo()
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

        [AllowAnonymous]
        [HttpPost("login")]
        public RequestResult Login([FromBody] SignInData data)
        {
            bool loginSuccess = false;
            string encodedJwt = "";
            int id = 0;

            if (db.CrmFathers.canLogin(new CRMFather(data.login, data.password), out id))
            {
                encodedJwt = GetFatherJwt(data, id);
                loginSuccess = true;
            }
            else if (db.MembersAccounts.isLogin(data.login, data.password, out id))
            {
                encodedJwt = GetMemberJwt(data, id);
                loginSuccess = true;
            }

            if (loginSuccess)
            {
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

        private string GetFatherJwt(SignInData sid, int fatherId)
        {
            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, sid.login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, Roles.FATHER_ROLE),
                    new Claim("userId", fatherId.ToString()),
                    new Claim("schoolId", db.School.GetSchoolId(fatherId).ToString())
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
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
        private string GetMemberJwt(SignInData sid, int id)
        {
            var personalData = db.Persones.Get(id);

            var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, sid.login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, db.MembersAccounts.Get(id).role),
                    new Claim("userId", id.ToString()),
                    new Claim("schoolId", personalData.idschool.ToString())
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
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}