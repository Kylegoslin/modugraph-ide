import sys
import re
# Take in the path to the file we want to work on.
src = sys.argv[1]

# Read all the contents into a string
contents = ""
with open(src) as f:
    for line in f.readlines():
        contents += line

# strip everything but spaecs
out = re.sub(r'([^\s\w\.]|_)+', '', contents)

# write the stripped file to a new temp file
f = open('tmp/temp1.txt', 'w')
f.write(out)
f.close()


