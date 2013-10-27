R CMD BATCH src/analyze.r results/results.txt
rm -f Rplots.pdf
echo "Running src/analyze.r and outputting to results/results.txt (and generating figures if analyze.r has code for them)."
