import sys
import re
from random import randint


# Take in the path to the file we want to work on.
src = sys.argv[1]

# Read all the contents into a string
contents = ""
with open(src) as f:
    for line in f.readlines():
        contents += line

# strip everything but spaecs
out = re.sub(r'([^\s\w\.]|_)+', '', contents)


num = randint(100, 90000)
# write the stripped file to a new temp file
f = open('tmp/'+str(num)+'.txt', 'w')
f.write(out)
f.close()

print(num)

