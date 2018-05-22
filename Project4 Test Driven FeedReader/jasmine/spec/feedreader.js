/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /*This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         for(let i = 0; i < allFeeds.length; i++){
           it('URL is defined and not empty', function() {
             expect(allFeeds[i].url).toBeDefined();
             expect(allFeeds[i].url,length).not.toEqual(0);
           });
         }

        /* loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         for(let i = 0; i < allFeeds.length; i++){
           it('name is defined and not empty', function() {
             expect(allFeeds[i].name).toBeDefined();
             expect(allFeeds[i].name.length).not.toEqual(0);
           });
         }
    });

    /* test suite for menu */
    describe('The Menu',function() {

      // test if the menu element is hidden by default.
      it('should be hidden by default',function() {
        expect($('body').attr('class')).toEqual('menu-hidden');
      });

      // test if the menu changes visibility when the menu icon is clicked.
       it('should toggle the menu display when the menu icon is clicked', function() {
         var menuIcon = $('.menu-icon-link');
         var body = $('body');
         menuIcon.click();
         expect(body.hasClass('menu-hidden')).toBe(false);
         menuIcon.click();
         expect(body.hasClass('menu-hidden')).toBe(true);
       })

    });

    /* test suite for Initial Entries */
    describe('Initial Entries', function() {

      /* when the loadFeed function is called and completes its work,
       * test if there is at least a single .entry element within the .feed container.
       */
       beforeEach(function(done) {
         var id = 0;
         loadFeed(id, function() {
             done();
           });
       });
       it('should create entry element inside container', function(done) {
         expect($('.feed').find('.entry').length).toBeGreaterThan(0);
         done();
       })
    });

    /* test suite for New Feed Selection */
    describe('New Feed Selection',function() {
      /* when a new feed is loaded by the loadFeed function,
       * test if content actually changes.
       * by default page is loading with id=0, so make id=1 to load new feed
       */
       var preFeed;
       beforeEach(function(done) {
         var id = 1;
         preFeed = $('.feed').find('.entry')[0].textContent;
         loadFeed(id, function() {
             done();
           });
       });
       it('should load new feed content', function(done) {
         var newFeed = $('.feed').find('.entry')[0].textContent;
         expect(preFeed.length).not.toEqual(newFeed.length);
         done();
       })

    });

}());
