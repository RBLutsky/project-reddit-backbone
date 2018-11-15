//we're defining a reusable model for our posts that will be an extension of the model object that Backbone provides
var PostModel = Backbone.Model.extend({
    defaults: function () {
        return {
            user: '',
            text: ''
        }
    }
});

// Backbone.View is an object.Inside that object, we'll define different attributes and functions to manipulate those attributes. In the end though, there is one main attribute that's important(el), and one main function that is important(render).
var PostView = Backbone.View.extend({
    // we can add any attributes we want to our views - template is a popular one by convention
    template: Handlebars.compile($('#post-template').html()),

    className: 'post',

    render: function () {
        //we're using $el and with it get to utilize jQuery's .html method to fill the body of our view with the template.
        this.$el.html(this.template(this.model.attributes));

        return this;
    }
});

//we add our click event handler to actually create the model and view instances
$('.add-post').on('click', function () {
    var text = $('#post-name').val();
    var user = $('#post-user').val();

    //We create an instance of our model with data (in the future, this will be done by the user via events) and could be called post1
    var postModel = new PostModel({
        text: text,
        user: user
    });

    //We create an instance of our view, and associate it with our model by passing it in and could be called view1.
    var postView = new PostView({
        model: postModel
    });

    //we invoke render on our view, which will always return itself, by referring to it's el and appending it to the page.
    $('.posts').append(postView.render().el)
});

