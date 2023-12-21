#include <bits/stdc++.h>
using namespace std;
int main()
{
  long long unsigned int n;
  cin >> n;
  n = (n * 2);
  cout << n << endl;
  long long unsigned int res = (((n % 1000000007) * ((n % 1000000007) + 1))) / 2;
  res %= 1000000007;
  cout << res << endl;
}