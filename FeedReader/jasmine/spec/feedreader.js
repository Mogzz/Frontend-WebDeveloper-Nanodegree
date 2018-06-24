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
                expect(element.url.length).not.toBeLessThan(1);
            })
        }
        for (let url in allFeeds) {
            hasUrl(allFeeds[url]);
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
        for (let name in allFeeds) {
            hasName(allFeeds[name]);
         }

    });


   
    describe('The Menu',function(){
        var body;
        var btn;
        var spyEvent;
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
            entries = document.querySelectorAll('.entry .feed');
            loadFeed(0,done);
          
        });
        /* a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('should contain atleast a single entry when loadFeed finishes', function(done){
            expect(entries.length).not.toBeLessThan(0);
            done();
        });
    });


    describe('New Feed Selection',function(){
        /*  a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        var feedAfterFirstLoad;
        var feedAfterSecondLoad;

        beforeEach(function(done){
            loadFeed(0, function () {
                feedAfterFirstLoad = document.querySelector('.feed').innerHTML();
                loadFeed(1, function () {
                    // get content of feed container again
                    feedAfterSecondLoad = document.querySelector('.feed').innerHTML();
                    done();
                })
             })
        });
        
            it('should change entries when loadFeed is called',function(done) {
                expect(feedAfterFirstLoad).not.toEqual(feedAfterSecondLoad);
                done();
            });
    
    });
}());
