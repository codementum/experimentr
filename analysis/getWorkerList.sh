# simple cut command, assumes workerId is the first column
# to use, pipe to a workers.txt file, and update workers.json
cut -d "," -f 1 data.csv
