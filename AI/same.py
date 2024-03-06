a= 'text.txt'
b= 'text_auto.txt'

with open(a, 'r') as text:
    a= text.readlines()
with open(b, 'r') as text:
    b= text.readlines()

if a==b:
    print('yes')
else:
    print('no')