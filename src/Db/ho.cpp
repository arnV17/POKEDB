#include <iostream>
using namespace std;

int main()
{
    int t, k;
    cin >> t;

    for (int i = 0; i < t; i++)
    {
        cin >> k;

        if (k == 1)
        {
            cout << "YES" << endl;
        }
        else if (k % 2 == 0)
        {
            cout << "NO" << endl;
        }
        else
        {
            cout << "YES" << endl;
        }
    }

    return 0;
}