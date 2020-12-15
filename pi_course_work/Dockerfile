FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["pi_course_work/pi_course_work.csproj", "pi_course_work/"]
RUN dotnet restore "pi_course_work/pi_course_work.csproj"
COPY . .
WORKDIR "/src/pi_course_work"
RUN dotnet build "pi_course_work.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "pi_course_work.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "pi_course_work.dll"]