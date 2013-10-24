To pull JSON data and convert
------

Update the fields list in convert.js, these will be your resulting csv fields.

Then run `./pullAndConvertToCSV.sh` to pull data from redis (resulting in data.json) and convert it to csv (data.csv).
You can then use analyze.r to analyze the data using R, or load data.csv into your favorite analysis tool (e.g. SPSS).

To use analyze.r
------

Install the ggplot2 library.
