/* feedreader.js */


$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
     
        it('are defined', function() { //check allFeeds to be defined and not be 0
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        function hasUrl(element) {
            it('has URL',function(){
                expect(element.url).toBeDefined();
                expect(element.url.length).toBeGreaterThan(0);
            })
        }
        for (let feed in allFeeds) {
            hasUrl(allFeeds[feed]);
         }

        /* a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        function hasName(element) {
            it('has Name',function(){
                expect(element.name).toBeDefined();
                expect(element.name.length).not.toBeLessThan(1);
            })
        }
        for (let feed in allFeeds) {
            hasName(allFeeds[feed]);
         }

    });


   
    describe('The Menu',function(){
        var body;
        var btn;
        beforeEach(function(){
            body = document.querySelector('body');
            btn  = document.querySelector('.menu-icon-link');
           
        });

        /*  a test that ensures the menu element is
         * hidden by default.
         */
        it('should be hidden as default',function(){
            expect(body.classList).toContain('menu-hidden');
        });

         /* a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('should show on click',function(){
             btn.click();
             expect(body.classList).not.toContain('menu-hidden');
         });

         it('should hide on next click',function(){
            btn.click();
            expect(body.classList).toContain('menu-hidden');
         });

    });

    
    describe('Initial Entries',function() {
        var entries;
        beforeEach(function(done){
            loadFeed(0, function () {
                entries = document.querySelectorAll('.feed .entry');
                done();
            });
    
        });
        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('should contain atleast a single entry when loadFeed finishes', function(){
            expect(entries.length).toBeGreaterThan(0)
       
        });
    });

    describe('New Feed Selection',function(){
        /* a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feedAfterFirstLoad;
        var feedAfterSecondLoad;

        beforeEach(function(done){
            loadFeed(0, function () {
                feedAfterFirstLoad = $('.feed').html();
                loadFeed(1, function () {
                    // get content of feed container again
                    feedAfterSecondLoad = $('.feed').html();
                    done();
                });
             });
        });
        
            it('should change entries when loadFeed is called',function() {
                
                expect(feedAfterFirstLoad).not.toEqual(feedAfterSecondLoad);
                
            });
    
    });
}());
