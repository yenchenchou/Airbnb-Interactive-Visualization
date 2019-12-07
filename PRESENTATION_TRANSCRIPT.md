### Slide1 - Cover slide (manual advance not included in time)
- Project title: Deep Trip in California
- Group name: undefined
- Team names: 
    *   Wei-Fan Chen (weifanch@usc.edu)
    *   Yen-Chen Chou (yenchenc@usc.edu)
    *   Runze Liu (runzeliu@usc.edu)

### Slide2 - Introduction(what is the project about)
* A platform where you understand your house selections comprehensively. It’s a tool to compare your selection with the majority distribution with respect to price, room type, location, popularity, and house style. In later slides, I will show you more details of what we have done. 

### Slide3 - Analysis – Explain the Data

* We used open data released by Airbnb. It is concerned with Airbnb house or room description. In the next slide, I will show you what our data contains.

* The data contains a lot of useful information and some features, just like location, price and so forth. Our project actually focuses on some important features, such as price. 

### Slide4 - Analysis – Explain the Topic
* We actually want to help users to know about the market of house renting in the area of California. For travelers, it can help provide a better choice for a house or a room in terms of specific requirements. For airbnb hosts, this app can give them advice on how they could improve their room to attract more travelers or make more profit.

### Slide5 - Design and Research Process / Tools

* The process of our job is very clear. We collected data first and preprocessed them into the format we need. And next, we used some tools to visualize our data by drawing graphs. And finally, we built an application which is very easy to use and shows the result.

* We use Python to preprocess data and then use D3 to visualize them by drawing four graphs. 
We chose VUE as web framework to develop our web application. And we also use bootstrap table to achieve a responsive website.


### Slide6 - Who Did What(Renze Wei-Fan Yen-Chen) 

* Renze designed the architecture of the system and the layout of our website. And Renze helped do some tasks about data exploring and visualization.

* Wei-Fan was responsible for data preprocessing and built a bubble map by maxbox which can interact with the plots that draw by D3. And she built the filter function as well. 

* Yen-Chen preprocessed them and designed four statistics graphs using D3 after analyzing all data. And he deployed our web on server.


### Slide7 - Research From Others

* We learned from this demo about its layout and some functionalities. Obviously, the way it works is that you can choose the features you care about and the web can help give information about them, like this map and this statistics graph.


### Slide8 - Our Difference

* We have this filter like the previous demo as well. But what we have done is a little different. We introduce a new way of interaction between users and our app. You pick up a point which is an airbnb house on the map and the statistics graphs on the right will change depending on what you choose. In this slide, if you click the point on the map, the bar corresponding to this point will be highlighted in this histogram. 


### Slide9 - Our Difference 
* Here is another example of this. You pick the same point and the bubble chart will change. You can see there is a bigger circle in the bubble chart. It is because you click the point on the map.


### Slide10 - Layout 
* We built a bubble map like this using MapBox. This map is actually zoomable. When you click one bubble, you can see the details of this area. And also, when you hover over on a single point, it can give you information about this house. Annd the right side are the five charts we build to servive the users.

### Slide11 - Bar Chart (deprecated)
* The bar plot shows the average price of the houses with respect to different room types. The x-axis demonstrates the average price and the y-axis shows three different rooms provided by Airbnb. For example, we can see that home/apt type are not only own the highest price on average but also the majority of all room types. As for the function part...

### Slide12 - Histogram (deprecated)

* The histogram shows the average price distribution of the houses. The x-axis demonstrates the price separated by a number of bins and the y-axis the total number of houses whose price falls in that range. For instance, we can observe from the hover that the price between 80 to 100 has the largest amount. We can also see that most of the house price centered below 300 dollars. As for the function part...


### Slide13 - Bubble Chart  (deprecated)

* The bubble plot is about showing how popular the places are by looking at the available days and the number of reviews. The x-axis demonstrates the average number of reviews given by a city name. And the y-axis shows the average number of available days that the houses have that particular city. In the top-right part is the legend, The size of the bubble declares how many houses are there in that city and the color of the bubble shows the average price of that city, the higher price will tend to be colored in red. For example, a place called Rowland Height may have low available days but tend to have many reviews, which indicates that the place is somehow popular. Also, the number of houses are low and the price is low as well, which implies that Rowland Height is a good place to travel without crowded with people with good budge. As for the function part...

### Slide14 - Circular Bar  (deprecated)

* This is the plot we extract words that described hotels and see how hotel descriptions are going to affect the price. The distribution of house types and their corresponding average price. The bar represents the number of houses in that type of house style. The longer bars represent a larger number of houses. The color of the bar separates the price between house styles. The higher price will tend to be colored in red. For example, people who liked to live in a modern style house than he or she may need to pay more for its staying. As for the function part...

### Slide15 - What could we have done better  (deprecated)
* Due to the time limitation, we have a lot of ideas haven’t fulfilled. For example, we mainly look from the view of customers, therefore, we compare price and room type to provide customer to make their decision. On the other hand, we really want to analyze the dataset from the perspective of hosts or anyone who are interested in running Airbnb as a business. We could provide a big picture of the market. To be more specific, they would like to know the key to  running a successful Airbnb, such as what kind of description are more attractive, easier to get an eye from the customers.


