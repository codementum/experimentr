sink('results.txt', append=FALSE, split=FALSE)
library("ggplot2")

d = read.csv('data.csv', header = TRUE, sep = ",")
adjacent = subset(d, chart == 'bar-adjacent')
p_adjacent = subset(adjacent, successfulPrime == 'true')
nonAdjacent = subset(d, chart == 'bar-nonAdjacentFive')
p_nonAdjacent = subset(nonAdjacent, successfulPrime == 'true')

#wilcox.test(errorAverage ~ primingType, data=p_nonAdjacent)
#kruskal.test(errorAverage ~ primingInfo, data=p_nonAdjacent)

cat('\n')
cat('# error:')
cat('\n')

  cat('\n')
  cat('## anova:')
  cat('\n')
  error <- aov(errorAverage ~ primingInfo, data=d)
  summary(error) 
  drop1(error,~.,test="F")
  
  cat('\n')
  cat('## hsd:')
  cat('\n')
  TukeyHSD( error )

cat('\n')
cat('# error adjacent:')
cat('\n')

  cat('\n')
  cat('## anova:')
  cat('\n')
  error <- aov(errorAverage ~ primingInfo, data=adjacent)
  summary(error) 
  drop1(error,~.,test="F")
  
  cat('\n')
  cat('## hsd:')
  cat('\n')
  TukeyHSD( error )

cat('\n')
cat('# error nonAdjacentFive:')
cat('\n')

  cat('\n')
  cat('## anova:')
  cat('\n')
  error <- aov(errorAverage ~ primingInfo, data=nonAdjacent)
  summary(error) 
  drop1(error,~.,test="F")
  
  cat('\n')
  cat('## hsd:')
  cat('\n')
  TukeyHSD( error )

cat('\n')
cat('# task time:')
cat('\n')

  cat('\n')
  cat('## anova:')
  cat('\n')
  tasktime <- aov(practiceAverage ~ primingInfo, data=d)
  summary(tasktime) 
  drop1(tasktime,~.,test="F")
  
  cat('\n')
  cat('## hsd:')
  cat('\n')
  TukeyHSD( tasktime )

cat('\n')
cat('# task time adjacent:')
cat('\n')

  cat('\n')
  cat('## anova:')
  cat('\n')
  tasktime <- aov(practiceAverage ~ primingInfo, data=adjacent)
  summary(tasktime) 
  drop1(tasktime,~.,test="F")
  
  cat('\n')
  cat('## hsd:')
  cat('\n')
  TukeyHSD( tasktime )

cat('\n')
cat('# task time nonAdjacent:')
cat('\n')

  cat('\n')
  cat('## anova:')
  cat('\n')
  tasktime <- aov(practiceAverage ~ primingInfo, data=nonAdjacent)
  summary(tasktime) 
  drop1(tasktime,~.,test="F")
  
  cat('\n')
  cat('## hsd:')
  cat('\n')
  TukeyHSD( tasktime )

cat('\n')
cat('# practice time:')
cat('\n')

  cat('\n')
  cat('## anova:')
  cat('\n')
  practicetime <- aov(time_diff_practice ~ primingInfo, data=d)
  summary(practicetime) 
  drop1(practicetime,~.,test="F")
  
  cat('\n')
  cat('## hsd:')
  cat('\n')
  TukeyHSD( practicetime )

cat('\n')
cat('# practice time adjacent:')
cat('\n')

  cat('\n')
  cat('## anova:')
  cat('\n')
  practicetime <- aov(time_diff_practice ~ primingInfo, data=adjacent)
  summary(practicetime) 
  drop1(practicetime,~.,test="F")
  
  cat('\n')
  cat('## hsd:')
  cat('\n')
  TukeyHSD( practicetime )

cat('\n')
cat('# practice time nonAdjacent:')
cat('\n')

  cat('\n')
  cat('## anova:')
  cat('\n')
  practicetime <- aov(time_diff_practice ~ primingInfo, data=nonAdjacent)
  summary(practicetime) 
  drop1(practicetime,~.,test="F")
  
  cat('\n')
  cat('## hsd:')
  cat('\n')
  TukeyHSD( practicetime )

cat('\n')
cat('# reading time:')
cat('\n')

  cat('\n')
  cat('## anova:')
  cat('\n')
  readingtime <- aov(time_diff_storyPrime ~ primingInfo, data=d)
  summary(readingtime) 
  drop1(readingtime,~.,test="F")
  
  cat('\n')
  cat('## hsd:')
  cat('\n')
  TukeyHSD( readingtime )

# charts

p <- ggplot(d, aes(factor(chart), errorAverage))
p + geom_boxplot(aes(fill = factor(primingInfo))) + coord_flip()
ggsave(file="error.pdf")

p <- ggplot(d, aes(factor(chart), practiceAverage))
p + geom_boxplot(aes(fill = factor(primingInfo))) + coord_flip()
ggsave(file="time.pdf")

cat('priming summary:\n')
summary(d$primingType)


cat('\n')
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


cat('\n')
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


cat('\n')
cat('time stats MAD and Median:\n\n')

cat('practice median:\n')
median(d$time_diff_practice)
cat('practice mad:\n')
mad(d$time_diff_practice)

cat('low median:\n')
median(d$time_diff_low)
cat('low mad:\n')
mad(d$time_diff_low)

cat('mediumLow median:\n')
median(d$time_diff_mediumLow)
cat('mediumLow mad:\n')
mad(d$time_diff_mediumLow)

cat('medium median:\n')
median(d$time_diff_medium)
cat('medium mad:\n')
mad(d$time_diff_medium)

cat('mediumHigh median:\n')
median(d$time_diff_mediumHigh)
cat('mediumHigh mad:\n')
mad(d$time_diff_mediumHigh)

cat('high median:\n')
median(d$time_diff_high)
cat('high mad:\n')
mad(d$time_diff_high)


cat('\n')
cat('time stats SD and mean:\n\n')

cat('practice mean:\n')
mean(d$time_diff_practice)
cat('practice sd:\n')
sd(d$time_diff_practice)

cat('low mean:\n')
mean(d$time_diff_low)
cat('low sd:\n')
sd(d$time_diff_low)

cat('mediumLow mean:\n')
mean(d$time_diff_mediumLow)
cat('mediumLow sd:\n')
sd(d$time_diff_mediumLow)

cat('medium mean:\n')
mean(d$time_diff_medium)
cat('medium sd:\n')
sd(d$time_diff_medium)

cat('mediumHigh mean:\n')
mean(d$time_diff_mediumHigh)
cat('mediumHigh sd:\n')
sd(d$time_diff_mediumHigh)

cat('high mean:\n')
mean(d$time_diff_high)
cat('high sd:\n')
sd(d$time_diff_high)



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

#cat('adjacent:\n')
#adj = subset(d, chart == 'bar-adjacent')
#summary(adj$primingType)
#t.test(errorAverage ~ primingType, data=adj)

