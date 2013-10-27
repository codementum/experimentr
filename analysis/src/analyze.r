# This just showcases some R functions for statistical analysis
d = read.csv('results/data.csv', header = TRUE, sep = ",")

# ttest
#t.test(valenceDiff ~ primingType, data=d)

# ANOVA + Tukey hsd (http://www.statmethods.net/stats/anova.html)
error <- aov(valenceDiff ~ primingType, data=d)
summary(error) 
drop1(error,~.,test="F")
TukeyHSD(error)

# ggplot2 is great for charts, but you have to install it before you can use/include it. To do so, run `R` then at the interactive prompt type `install.packages("ggplot2")` and select a mirror.
library("ggplot2")

# example charts
p <- ggplot(d, aes(factor(primingType), valenceDiff))
p + geom_boxplot() + coord_flip() + geom_jitter()
ggsave(file="results/valenceDiff.pdf")
