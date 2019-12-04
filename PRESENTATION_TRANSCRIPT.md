### Slide1 - Cover slide (manual advance not included in time)
- Project title: Deep Trip in California
- Group name: undefined
- Team names: 
    *   Wei-Fan Chen (weifanch@usc.edu)
    *   Yen-Chen Chou (yenchenc@usc.edu)
    *   Runze Liu (runzeliu@usc.edu)

### Slide2 - Introduction(what is the project about)
A platform where you understand your house selections comprehensively. It’s a tool to compare your selection with the majority distribution with respect to price, room type, location, popularity, and house style. In later slides, I will show you more details of what we have done. 

### Slide3 - Analysis – Explain the Data

### Slide4 - Analysis – Explain the Data

### Slide5 - Analysis – Explain the Topic
We actually want to help users to know about the market of house renting in the area of California. For travelers, it can help provide a better choice for a house or a room in terms of specific requirements. For airbnb hosts, this app can give them advice on how they could improve their room to attract more travelers or make more profit.

### Slide6 - Design and Research Process

The process of our job is very clear. We collected data first and preprocessed them into the format we need. And next, we used some tools to visualize our data by drawing graphs. And finally, we built an application which is very easy to use and shows the result.


### Slide7 - Design Process – Tools
We use Python to preprocess data and then use D3 to visualize them by drawing four graphs. 
We chose VUE as web framework to develop our web application. And we also use bootstrap table to achieve a responsive website.


### Slide8 - Who Did What

My job was to design the architecture of the system and the layout of our website. And I helped do some tasks about data exploring and visualization.



### Slide9 - Who Did What


Wei-Fan was responsible for data preprocessing and built a bubble map by maxbox which can interact with the plots that draw by D3. And she built the filter function as well. 


### Slide10 - Who Did 

Yen-Chen preprocessed them and designed four statistics graphs using D3 after analyzing all data. And he deployed our web on server.



### Slide11 - Research From Others

We learned from this demo about its layout and some functionalities. Obviously, the way it works is that you can choose the features you care about and the web can help give information about them, like this map and this statistics graph.


### Slide12 - Our Difference

We have this filter like the previous demo as well. But what we have done is a little different. We introduce a new way of interaction between users and our app. You pick up a point which is an airbnb house on the map and the statistics graphs on the right will change depending on what you choose.



### Slide13 - Our Difference

In this slide, if you click the point on the map, the bar corresponding to this point will be highlighted in this histogram.


### Slide14 - Our Difference
Here is another example of this. You pick the same point and the bubble chart will change. You can see there is a bigger circle in the bubble chart. It is because you click the point on the map.


### Slide15 - Layout

This is what our app really looks like. Here is a map and we focus on California area. On the right hand side, there are two areas. The one above is the filter and the one below is the area where you can see the statistics graphs.


### Slide16 - Bubble Map
We built a bubble map like this using MapBox. This map is actually zoomable. When you click one bubble, you can see the details of this area. And also, when you hover over on a single point, it can give you information about this house.

### Slide17 - Bar Chart
The bar plot shows the average price of the houses with respect to different room types. The x-axis demonstrates the average price and the y-axis shows three different rooms provided by Airbnb. For example, we can see that home/apt type are not only own the highest price on average but also the majority of all room types. As for the function part...

### Slide18 - Histogram

The histogram shows the average price distribution of the houses. The x-axis demonstrates the price separated by a number of bins and the y-axis the total number of houses whose price falls in that range. For instance, we can observe from the hover that the price between 80 to 100 has the largest amount. We can also see that most of the house price centered below 300 dollars. As for the function part...


### Slide19 - Bubble Chart

The bubble plot is about showing how popular the places are by looking at the available days and the number of reviews. The x-axis demonstrates the average number of reviews given by a city name. And the y-axis shows the average number of available days that the houses have that particular city. In the top-right part is the legend, The size of the bubble declares how many houses are there in that city and the color of the bubble shows the average price of that city, the higher price will tend to be colored in red. For example, a place called Rowland Height may have low available days but tend to have many reviews, which indicates that the place is somehow popular. Also, the number of houses are low and the price is low as well, which implies that Rowland Height is a good place to travel without crowded with people with good budge. As for the function part...

### Slide20 - Circular Bar

This is the plot we extract words that described hotels and see how hotel descriptions are going to affect the price. The distribution of house types and their corresponding average price. The bar represents the number of houses in that type of house style. The longer bars represent a larger number of houses. The color of the bar separates the price between house styles. The higher price will tend to be colored in red. For example, people who liked to live in a modern style house than he or she may need to pay more for its staying. As for the function part...



