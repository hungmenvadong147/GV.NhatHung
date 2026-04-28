@echo off
echo :wq > temp_vim_cmd.txt
type temp_vim_cmd.txt | git revert --continue
del temp_vim_cmd.txt
git push --force-with-lease
