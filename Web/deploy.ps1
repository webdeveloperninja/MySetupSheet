#powershell -ExecutionPolicy ByPass -File deploy.ps1 -resourceGroup Sandbox -storageAccountName asdfsfdsdf -storageAccountLocation "East US" -containerName web

param(
  [string]$resourceGroup,
  [string]$storageAccountName,
  [string]$storageAccountLocation,
  [string]$containerName
)

$storageAccount = New-AzureRmStorageAccount -ResourceGroupName $resourceGroup `
  -Name $storageAccountName `
  -SkuName Standard_LRS `
  -Location $storageAccountLocation `

$ctx = $storageAccount.Context

new-azurestoragecontainer -Name $containerName -Context $ctx -Permission blob

$files = Get-ChildItem "./dist/spa"

foreach ($file in $files) {
  If ($file.Extension -eq ".html") {
    $mimeType = "text/html"
  }

  If ($file.Extension -eq ".js") {
    $mimeType = "text/javascript"
  }

  If ($file.Extension -eq ".css") {
    $mimeType = "text/css"
  }
  
  Set-AzureStorageBlobContent -File $file.FullName `
    -Container $containerName `
    -Blob $file.Name `
    -Context $ctx `
    -Properties @{"ContentType" = $mimeType; }
}
 

