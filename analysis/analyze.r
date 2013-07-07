d = read.csv('data.csv', header = TRUE, sep = ",")

# long method (will need for multiple charts)
# n = d$primingType == 'negative' 
# p = d$primingType == 'positive' 
# d2.n = d[n,]$cm_average 
# d2.p = d[!n,]$cm_average 
# t.test(d2.n, d2.p)

# short method
t.test(cm_average ~ primingType, data=d)
