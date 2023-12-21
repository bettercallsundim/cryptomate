t = int(input())
for x in range(t):
    n = int(input())
    ss = input()
    ps = 0
    tg = 0
    solved = ""
    ass=0
    ind=0
    tn=0
    for y in ss:
      tg=(ord(y)-64)
      if (y not in solved):
        if (tg<=ind+1):
          tn+=tg
          if tg>n:
            break
          else:
            solved+=y
            ps+=1
      ind+=1



    print("ans",ps)
    print("sol",solved)



