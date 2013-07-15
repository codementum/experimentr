sink('results.txt', append=FALSE, split=FALSE)
library("ggplot2")

d = read.csv('data.csv', header = TRUE, sep = ",")

cat('All charts:\n\n\n')
t.test(errorAverage ~ primingType, data=d)

cat('All participants:\n\n\n')

cat('adjacent:\n')
adj = subset(d, chart == 'bar-adjacent')
summary(adj$primingType)
t.test(errorAverage ~ primingType, data=adj)

cat('nonAdjacentFive:\n')
five = subset(d, chart == 'bar-nonAdjacentFive')
summary(five$primingType)
t.test(errorAverage ~ primingType, data=five)


cat('Primed participants:\n\n\n')

cat('adjacent:\n')
padj = subset(adj, successfulPrime == 'true')
summary(padj$primingType)
t.test(errorAverage ~ primingType, data=padj)

cat('nonAdjacentFive:\n')
pfive = subset(five, successfulPrime == 'true')
summary(pfive$primingType)
t.test(errorAverage ~ primingType, data=pfive)

cat('Timing:\n\n\n')

cat('reading time all:\n')
t.test(time_diff_storyPrime ~ primingType, data=d)

cat('task time all:\n')
t.test(practiceAverage ~ primingType, data=d)

cat('task time adj:\n')
t.test(practiceAverage ~ primingType, data=adj)

cat('task time nonadj:\n')
t.test(practiceAverage ~ primingType, data=five)

cat('task time primed:\n')
primed = subset(d, successfulPrime == 'true')
t.test(practiceAverage ~ primingType, data=primed)

cat('task time adj primed:\n')
t.test(practiceAverage ~ primingType, data=padj)

cat('task time nonadj primed:\n')
t.test(practiceAverage ~ primingType, data=five)

cat('charts:\n\n\n')

qplot(factor(primingInfo), practiceAverage, data = d, geom = "jitter")
ggsave(file="prime-by-time.pdf")

qplot(factor(primingInfo), errorAverage, data = d, geom = "jitter")
ggsave(file="prime-by-error.pdf")


#qplot(factor(primingType), errorAverage, data = padj, geom = "jitter")
#ggsave(file="padj-prime-by-error.pdf")
#
#qplot(factor(primingType), errorAverage, data = pfive, geom = "jitter")
#ggsave(file="pfive-prime-by-error.pdf")




cat('sd errorAverage:\n')
sd(d$errorAverage)

cat('mad errorAverage:\n')
mad(d$errorAverage)

cat('mean errorAverage:\n')
mean(d$errorAverage)

cat('median errorAverage:\n')
median(d$errorAverage)

cat('sd practiceAverage:\n')
sd(d$practiceAverage)

cat('mean practiceAverage:\n')
mean(d$practiceAverage)

cat('priming summary:\n')
summary(d$primingType)


cat('individual judgement stats:\n\n')

cat('low mean:\n')
mean(d$judgement_low)
cat('low sd:\n')
sd(d$judgement_low)

cat('mediumLow mean:\n')
mean(d$judgement_mediumLow)
cat('mediumLow sd:\n')
sd(d$judgement_mediumLow)

cat('medium mean:\n')
mean(d$judgement_medium)
cat('medium sd:\n')
sd(d$judgement_medium)

cat('mediumHigh mean:\n')
mean(d$judgement_mediumHigh)
cat('mediumHigh sd:\n')
sd(d$judgement_mediumHigh)

cat('high mean:\n')
mean(d$judgement_high)
cat('high sd:\n')
sd(d$judgement_high)

cat('individual judgement stats MAD and Median:\n\n')

cat('low median:\n')
median(d$judgement_low)
cat('low mad:\n')
mad(d$judgement_low)

cat('mediumLow median:\n')
median(d$judgement_mediumLow)
cat('mediumLow mad:\n')
mad(d$judgement_mediumLow)

cat('medium median:\n')
median(d$judgement_medium)
cat('medium mad:\n')
mad(d$judgement_medium)

cat('mediumHigh median:\n')
median(d$judgement_mediumHigh)
cat('mediumHigh mad:\n')
mad(d$judgement_mediumHigh)

cat('high median:\n')
median(d$judgement_high)
cat('high mad:\n')
mad(d$judgement_high)



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
