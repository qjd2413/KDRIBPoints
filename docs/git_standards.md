# Git Workflow

This document will outline the standards for the git workflow that developers will need to take in order to make changes to this repository.

## Workflow

The following steps are assuming you are working from the command line, and are currently on the master branch.

1. Get the most current changes to master
  
    `git pull`

2. Create a new branch. <new branch> should be replaced with a name that is descriptive of the changes you plan to make.

    `git checkout -b <new branch>`

3. Make changes. Try to make these changes in a cohesive way, so that if they need to be undone for any reason, that is done easily. When there is a cohesive chunk of working code, run the following commands.

        git add -p               // this adds the changes in chunks, in an interactive way. type 'y' to stage, and 'n' to pass
        git commit -v            // this commits the changes with a diff in the commit message so you can double check your                                changes
        git push origin <branch name>       // moves your changes to github, so everyone collaborating can see
        
4. When the feature is completed, make a pull request. This is most easily done through Github. Make sure the PR has a descriptive name and description. Tag the other two developers (or just two developers) in the description or in a comment. Before merging the pull request to the master branch, it must be reviewed by two developers. This means that two developers must look over the PR and add :+1: or something to that effect to the PR.

5. Once the PR is :+1: 'd by two different developers, you may merge it to master. Merge it, deploy it to whatever server we're working on (most likely a development server, will link docs here when applicable) and then delete the branch. Make sure the functionality is as it's expected to be before deleting the branch and closing whatever issue is being worked on.

The important things to remember here are to commit early and often, and to make sure your code is reviewed before merging. This way, we'll be able to keep standards consistent as well as stop the need for much refactoring later on.
