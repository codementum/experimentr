# simple cut command, assumes workerId is the first column
# to use, pipe to a workers.txt file, and update workers.json
echo "[" > results/workers.json
tail -n +2 results/data.csv | cut -d "," -f 1 | tr -d ' ' >> results/workers.json
echo "]" >> results/workers.json
