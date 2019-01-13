$files = Get-ChildItem "./dist/spa"

foreach ($file in $files) {
  $file.Name
  $file.FullName

  If ($file.Extension -eq ".html") {
    $mimeType = "text/html"
  }

  If ($file.Extension -eq ".js") {
    $mimeType = "text/javascript"
  }

  If ($file.Extension -eq ".css") {
    $mimeType = "text/css"
  }

  Write-Host $mimeType;
}