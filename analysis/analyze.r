library("ggplot2")

d = read.csv('data.csv', header = TRUE, sep = ",")

# ttest
#t.test(subsetAverage ~ primingType, data=d)

# anova + hsd
#error <- aov(subsetAverage ~ primingType * chart, data=d)
#summary(error) 
#drop1(error,~.,test="F")
#TukeyHSD( error )

# charts
#p <- ggplot(d, aes(factor(chart), subsetAverage))
#p + geom_boxplot(aes(fill = factor(primingType))) + coord_flip() + geom_jitter()
#ggsave(file="error.pdf")
