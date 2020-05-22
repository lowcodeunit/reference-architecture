$originExists = $false

$status = git status

$branchName = $status[0].Replace("On branch ", "")

$branches = git branch -r -l

foreach ($b in $branches)
{
  if($b.Contains("origin/" + $branchname))
  {
    git add . -f
    git commit -m "local commmit"        
    git pull
    git push -u origin $branchName
    $originExists = $true
    Write-Host Synced latest with $branchName origin
    break
  }  
}

if(($branchName.StartsWith("feature/")) -and ($originExists -eq $false))
{
    git add . -f
    git commit -m "adding upstream source and pushing"
    git push -u origin $branchName
    Write-Host Pushed $branchName to upstream origin
} 

