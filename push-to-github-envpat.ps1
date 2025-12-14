param (
    [string]$ProjectRoot = "C:\LocalServerHub\OpenSourceProjects_NodeJS\employee-dashboard",
    [string]$GitUser = "viveklucky1986",
    [string]$GitEmail = "viveklucky1986@users.noreply.github.com",
    [string]$RepoName = "Node-GraphQL-Assignments",
    [string]$BranchName = "employee-dashboard"
)

Write-Host "=== GitHub Push (ENV-PAT, PowerShell 5.1) ===" -ForegroundColor Cyan

# ---------------- VALIDATION ----------------

if (-not $env:GITHUB_PAT) {
    Write-Error "GITHUB_PAT environment variable is NOT set."
    exit 1
}

if (-not (Test-Path $ProjectRoot)) {
    Write-Error "Project root not found: $ProjectRoot"
    exit 1
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed or not in PATH."
    exit 1
}

Set-Location $ProjectRoot

# ---------------- GIT CONFIG ----------------

Write-Host "Configuring git identity..." -ForegroundColor Yellow
git config user.name  "$GitUser"
git config user.email "$GitEmail"

# ---------------- INIT REPO ----------------

if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init | Out-Null
}

# ---------------- GITIGNORE ----------------

$gitignorePath = Join-Path $ProjectRoot ".gitignore"

if (-not (Test-Path $gitignorePath)) {
    @"
node_modules/
dist/
.env
.vite/
coverage/
*.log
"@ | Out-File $gitignorePath -Encoding UTF8
}

# ---------------- COMMIT ----------------

Write-Host "Staging files..." -ForegroundColor Yellow
git add . | Out-Null

$commitMsg = "Employee Dashboard - fullstack GraphQL assignment"
git commit -am $commitMsg 2>$null

# ---------------- REMOTE ----------------

$remoteUrl = "https://${GitUser}:$($env:GITHUB_PAT)@github.com/${GitUser}/${RepoName}.git"

git remote remove origin 2>$null
git remote add origin $remoteUrl

# ---------------- BRANCH ----------------

Write-Host "Ensuring branch '$BranchName' exists..." -ForegroundColor Yellow

$branchExists = git branch --list $BranchName
if (-not $branchExists) {
    git checkout -b $BranchName
}
else {
    git checkout $BranchName
}

# ---------------- PUSH ----------------

Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin $BranchName -f

if ($LASTEXITCODE -ne 0) {
    Write-Error "Git push failed."
    exit 1
}

Write-Host "=== SUCCESS ===" -ForegroundColor Green
Write-Host "Repo   : https://github.com/$GitUser/$RepoName" -ForegroundColor Green
Write-Host "Branch : $BranchName" -ForegroundColor Green
