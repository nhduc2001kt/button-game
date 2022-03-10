# Button game

## 1. Game rule
- A player can start from any color
- The player can select a next color by clicking any other button rather than the button itself
- From <span style="color:blue">**Blue**</span>, you can go to <span style="color:green">**Green**</span>
- From <span style="color:blue">**Blue**</span>, you can go to <span style="color:yellow">**Yellow**</span>
- From <span style="color:green">**Green**</span>, you can only go to <span style="color:blue">**Blue**</span>
- From <span style="color:yellow">**Yellow**</span>, you can only go to <span style="color:blue">**Blue**</span>
- You cannot visit <span style="color:blue">**Blue**</span>-<span style="color:yellow">**Yellow**</span> consecutively
- The player will loose the game as soon as he violates the game rule, otherwise he can play it forever

## 2. Run project
### 2.1 Install the project dependencies
```
yarn install
```

### 2.2 Start project
```
yarn start
```