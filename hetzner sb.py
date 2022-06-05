import requests
import json

sburl="https://www.hetzner.com/a_hz_serverboerse/live_data.json?m=1618234036271"

resp = requests.get(sburl)

a = resp.text
b = json.loads(a)

c = b["server"]

maxprice = 1000
priceamt = 0

eff = 10
for i in c:
    size = int(i['hdd_size'])
    count = int(i['hdd_count'])
    price = float(i['price'])
    price = int(price)
    price = price * 1.2
    totalsize = size * count
    eff1 = (totalsize * .85) / price
    if eff1 > eff and price <= maxprice:
        z = i['datacenter']
        v = z[1]
        if v != "HEL":
            eff  = eff1
            final1 = i
            priceamt = price
        

print(eff)
print(final1)
print(priceamt)

