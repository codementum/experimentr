sink('results.txt', append=FALSE, split=FALSE)
#sink()

d = read.csv('data.csv', header = TRUE, sep = ",")

cat('All charts:\n\n\n')
t.test(cm_average ~ primingType, data=d)

cat('All participants:\n\n\n')

cat('adjacent:\n')
adj = subset(d, chart == 'bar-adjacent')
summary(adj$primingType)
t.test(cm_average ~ primingType, data=adj)

#cat('nonAdjacentOne:\n')
#one = subset(d, chart == 'bar-nonAdjacentOne')
#summary(one$primingType)
#t.test(cm_average ~ primingType, data=one)
#
#cat('nonAdjacentThree:\n')
#three = subset(d, chart == 'bar-nonAdjacentThree')
#summary(three$primingType)
#t.test(cm_average ~ primingType, data=three)

cat('nonAdjacentFive:\n')
five = subset(d, chart == 'bar-nonAdjacentFive')
summary(five$primingType)
t.test(cm_average ~ primingType, data=five)


cat('Primed participants:\n\n\n')

cat('adjacent:\n')
padj = subset(adj, successfulPrime == 'true')
summary(padj$primingType)
t.test(cm_average ~ primingType, data=padj)

cat('nonAdjacentFive:\n')
pfive = subset(five, successfulPrime == 'true')
summary(pfive$primingType)
t.test(cm_average ~ primingType, data=pfive)


#cat('nonAdjacentSeven:\n')
#seven = subset(d, chart == 'bar-nonAdjacentSeven')
#summary(seven$primingType)
#t.test(cm_average ~ primingType, data=seven)

cat('task time:\n')
t.test(time_diff_average ~ primingType, data=d)

cat('sd cm_average:\n')
sd(d$cm_average)

cat('mean cm_average:\n')
mean(d$cm_average)

cat('sd time_diff_average:\n')
sd(d$time_diff_average)

cat('sd time_diff_experiment:\n')
sd(d$time_diff_experiment)

cat('mean time_diff_experiment:\n')
mean(d$time_diff_experiment)

cat('priming summary:\n')
summary(d$primingType)

# long method (can use to filter by chart type)
# n = d$primingType == 'negative' 
# p = d$primingType == 'positive' 
# d2.n = d[n,]$cm_average 
# d2.p = d[!n,]$cm_average 
# t.test(d2.n, d2.p)

# ANOVA: http://www.statmethods.net/stats/anova.html
# One Way Anova (Completely Randomized Design)
#fit <- aov(cm_average ~ chart, data=d)
#summary(fit)
# Plots
#layout(matrix(c(1,2,3,4),2,2)) # optional layout 
#plot(fit) # diagnostic plots
# Tukey Honestly Significant Differences
# TukeyHSD(fit) # where fit comes from aov()

# Plot Means with Error Bars
# library(gplots)
# attach(d)
# primingType <- factor(primingType)
# plotmeans(cm_average ~ primingType,xlab="priming type",
#             ylab="error cm", main="Mean Plot\nwith 95% CI")
