n = int(input())
ls = list(map(int, input().split(" ")))
steps = 0
mxi = ls.index(max(ls))
mni = n-(n-ls[::-1].index(min(ls)))-1
steps += mxi+mni
if ls.index(min(ls))>mxi:
  steps+=1
print(steps)
