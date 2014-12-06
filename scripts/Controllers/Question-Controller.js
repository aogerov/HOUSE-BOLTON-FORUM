var questionController = (function () {
    
    
    function visualizeSmallQuestions(questions, selector, limitForContent) {
        var dfd = new jQuery.Deferred();
        $.each(questions, function (_, question) {
            jQuery.ajaxSetup({async:false});
            $.when(tagModule.getAllTagsRelatedToQuestion(question.objectId)).done(function (tagData) {
                var questionTitle = question.title;
                var questionContent;
                if (limitForContent) {
                     questionContent = question.content.substr(0, limitForContent) + "...";
                } else {
                    questionContent = question.content;
                }
                var questionAuthor = question.createdBy.username;
                var questionCreatedAt = question.createdAt;
                var questionAuthorId = question.createdBy.objectId;
                var questionCategory = question.category.name;
                var questionCategoryID = question.category.objectId;
                var questionTags = [];
                $.each(tagData.results, function (_, tag) {
                    questionTags.push(tag);
                });
                var questionVisits = question.visits;
                var questionVotes = question.votes;

                var questionHTML = questionView.visualizeSmallQuestion(question.objectId, questionCreatedAt, questionTitle, questionContent, questionAuthor, questionCategory, questionCategoryID, questionTags, questionVisits, questionVotes, questionAuthorId);
                selector.append(questionHTML);
                dfd.resolve('Success');
            })
        });
        jQuery.ajaxSetup({async:true});
        return dfd.promise();
    }
    
    function getAndVisualizeLastNQuestions(n, selector) {
        var questionsPromise = questionsModule.getAllQuestions(n);
        questionsPromise.success(function (data) {
            var questions = data.results;

            visualizeSmallQuestions(questions, selector, CHARACTERS_TO_BE_DISPLAYED_AT_SMALL_QUESTIONS);
        }).error(function (err) {
            console.log(err);
        });
    }
    
    function getAndVisualizeQuestionByID(questionID, selector) {
        questionsModule.upVisitsByOne(questionID);
        var questionPromise = questionsModule.getQuestionByID(questionID);
        questionPromise.success(function (question) {
            visualizeSmallQuestions([question], selector).then(function (data) {
                AnswerController.visualizeAllAnswers(questionID, selector);
            });
        }).error(function (err) {
            console.log(err);
        });
    }


    function VisualizeAddQuestion(selector) {
        var loggedUser = UserController.getLoggedUser();
        var $pleaseLogin = $('<article class="small-question">').append($('<p>').html('If you want to add an answer, please <a href="#/register/">register</a> or <a href="#/login/">login</a> to your account.'));
        if (!loggedUser) {
            selector.append($pleaseLogin);
        }
        else {
            selector.append(questionView.visualizeAddQuestion());
            categoryController.fillCategoriesSelect();
            $('#add-question-button').click(function () {
                var title = $('#title').val();
                var content = $('#content').val();
                var user = loggedUser.objectId;
                var tags = $('#tags').val().split(/,\s*/);
                var tagIds = [];
                jQuery.ajaxSetup({async:false});
                $.each(tags, function (_, tag) {
                    tagModule.getTagByName(tag).success(function (data) {
                        if (data.results.length == 0) {
                            tagModule.addTag(tag, []).success(function (newTagData) {
                                tagIds.push(newTagData.objectId);
                            })
                        } else {
                            tagIds.push(data.results[0].objectId);
                        }
                    })
                });
                jQuery.ajaxSetup({async:true});
                var category = $('select').find(':selected').attr('value');
                questionsModule.addQuestion(title, content, user, category, tagIds).success(function (data) {
                    window.history.pushState('Home', 'Home', '#/view/question/' + data.objectId);
                    $.each(tagIds, function (_, tagId) {
                        tagModule.editTag(tagId, data.objectId);
                    })
                });
            })
        }
    }

    return {
        getAndVisualizeLastNQuestions: getAndVisualizeLastNQuestions,
        getAndVisualizeQuestionByID: getAndVisualizeQuestionByID,
        getAndVisualizeSmallQuestions: visualizeSmallQuestions,
        VisualizeAddQuestion: VisualizeAddQuestion
    }
})();