# Workflow Cheat‑Sheet

1. `git checkout -b feat/mXX-{milestone-name}`
2. `git worktree add ../{branch-name} feat/mXX-{milestone-name}`
3. Create tasks: copy `/docs/tasks/TEMPLATE.md`, fill Title, Context, Acceptance.
4. Launch agent with corresponding `/commands/agents/{role}.md` + task.
5. PR → parent milestone branch.
6. When all child PRs green:  
```

git checkout feat/mXX-{milestone-name}
git merge --ff-only origin/feat/mXX-{milestone-name}
git checkout main
git merge --ff-only feat/mXX-{milestone-name}

```
7. Delete worktrees, repeat for next milestone.
