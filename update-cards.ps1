# PowerShell script to update all card components to use emails and phones arrays

$cardsDir = "c:\Users\User\Videos\bizcard-palette\src\components\cards"
$cardFiles = Get-ChildItem "$cardsDir\*.tsx" -Exclude "shared*","shared-ui*","registry*" -File

foreach ($file in $cardFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace destructuring: phone = -> phones = [ and email = -> emails = [
    $content = $content -replace "(\s+)phone\s*=\s*'([^']+)'", "`$1phones = ['`$2']"
    $content = $content -replace '(\s+)phone\s*=\s*"([^"]+)"', '$1phones = ["$2"]'
    $content = $content -replace "(\s+)email\s*=\s*'([^']+)'", "`$1emails = ['`$2']"
    $content = $content -replace '(\s+)email\s*=\s*"([^"]+)"', '$1emails = ["$2"]'
    
    # Replace ContactInfo props: email={email} -> emails={emails}, phone={phone} -> phones={phones}
    $content = $content -replace 'email=\{email\}', 'emails={emails}'
    $content = $content -replace 'phone=\{phone\}', 'phones={phones}'
    
    # Replace ContactActions props: email={email} -> emails={emails}, phone={phone} -> phones={phones}
    # This handles cases where they span multiple lines too
    $content = $content -replace '(\s+)phone=\{phone\}', '$1phones={phones}'
    $content = $content -replace '(\s+)email=\{email\}', '$1emails={emails}'
    
    Set-Content $file.FullName -Value $content -NoNewline
    Write-Host "Updated: $($file.Name)"
}

Write-Host "`nAll card files updated successfully!"
