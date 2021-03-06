(function() {
  "use strict";

  var root = this,
      $ = root.jQuery;
  if(typeof root.GOVUK === 'undefined') { root.GOVUK = {}; }

  var TEMPLATE = '<section id="user-satisfaction-survey" class="visible" aria-hidden="false">' +
                 '  <div class="wrapper">' +
                 '    <h1>Tell us what you think of GOV.UK</h1>' +
                 '    <p class="right"><a href="#survey-no-thanks" id="survey-no-thanks">No thanks</a></p>' +
                 '    <p><a href="javascript:void()" id="take-survey" target="_blank" rel="noopener noreferrer">Take the 3 minute survey</a> This will open a short survey on another website</p>' +
                 '  </div>' +
                 '</section>';

  /* This data structure is explained in `doc/surveys.md` */
  var userSurveys = {
    defaultSurvey: {
      url: 'https://www.surveymonkey.com/s/2MRDLTW',
      identifier: 'user_satisfaction_survey',
      template: TEMPLATE,
      frequency: 50
    },
    smallSurveys: [
      {
        url: 'https://www.surveymonkey.co.uk/r/6QC8RV8',
        identifier: 'environment_survey',
        template: '<section id="user-satisfaction-survey" class="visible" aria-hidden="false">' +
                  '  <div class="wrapper">' +
                  '    <h1>Why did you come to GOV.UK today?</h1>' +
                  '    <p class="right"><a href="#survey-no-thanks" id="survey-no-thanks">No thanks</a></p>' +
                  '    <p><a href="javascript:void()" id="take-survey" target="_blank" rel="noopener noreferrer">Answer 2 quick questions</a> to help us make GOV.UK better.</p>' +
                  '  </div>' +
                  '</section>',
        frequency: 5,
        activeWhen: function() {
          function sectionMatches() {
            var sectionName = $('meta[name="govuk:section"]').attr('content');
            return (/environment/i.test(sectionName) || /outdoor/i.test(sectionName));
          }

          function organisationMatches() {
            var orgMatchingExpr = /<D7>|<EA199>|<EA1079>|<EA53>|<EA58>|<EA60>|<PB57>|<PB202>/;
            var metaText = $('meta[name="govuk:analytics:organisations"]').attr('content') || "";
            return orgMatchingExpr.test(metaText);
          }

          return (sectionMatches() || organisationMatches());
        },
        startTime: new Date("February 5, 2017").getTime(),
        endTime: new Date("February 10, 2017 23:59:59").getTime()
      },
      {
        url: 'https://www.surveymonkey.co.uk/r/W5LS62K',
        identifier: 'family_visa_survey',
        template: TEMPLATE,
        frequency: 10,
        activeWhen: function() {
          function pathMatches() {
            var pathMatchingExpr = /\/(remain-in-uk-family|join-family-in-uk)/;

            return pathMatchingExpr.test(userSurveys.currentPath());
          }

          return (pathMatches());
        },
        startTime: new Date("December 12, 2016").getTime(),
        endTime: new Date("February 5, 2017 23:59:59").getTime()
      },
      {
        url: "https://signup.take-part-in-research.service.gov.uk/?utm_campaign=" + window.location.pathname + "&utm_source=govukother&utm_medium=gov.uk&t=GDS",
        identifier: 'env_ur_panel',
        template: '<section id="user-satisfaction-survey" class="visible" aria-hidden="false">' +
                  '  <div class="wrapper">' +
                  '    <h1>Help improve GOV.UK</h1>' +
                  '    <p class="right"><a href="#survey-no-thanks" id="survey-no-thanks">No thanks</a></p>' +
                  '    <p><a href="javascript:void()" id="take-survey" target="_blank" rel="noopener noreferrer">Answer some questions about yourself to join the research community</a>. This link opens in a new tab.</p>' +
                  '  </div>' +
                  '</section>',
        frequency: 2,
        activeWhen: function() {

          function pathMatches() {
            var pathMatchingExpr = new RegExp('/(?:'
              + /check-flood-risk/.source
              + /|fishing-licences\/buy-a-fishing-licence/.source
              + /|fishing-licences\/when-you-need-a-licence/.source
              + /|topic\/environmental-management\/environmental-permits/.source
              + /|topic\/environmental-management\/waste/.source
              + /|hunting\/overview/.source
              + /|report-dead-animal/.source
              + /|browse\/environment-countryside\/flooding-extreme-weather/.source
              + /|sign-up-for-flood-warnings/.source
              + ')'
            );
            return pathMatchingExpr.test(userSurveys.currentPath());
          }

          return (pathMatches());
        },
        startTime: new Date("January 16, 2017").getTime(),
        endTime: new Date("February 12, 2017 23:59:59").getTime()
      },
      {
        url: 'https://www.surveymonkey.com/s/2MRDLTW',
        identifier: 'education_survey',
        template: TEMPLATE,
        frequency: 10,
        activeWhen: function() {
          function breadcrumbMatches() {
            var text = $('.govuk-breadcrumbs').text() || "";
            return (/Education/i.test(text) || /Childcare/i.test(text) || /Schools/i.test(text));
          }

          function sectionMatches() {
            var sectionName = $('meta[name="govuk:section"]').attr('content');
            return (/education/i.test(sectionName) || /childcare/i.test(sectionName) || /schools/i.test(sectionName));
          }

          function organisationMatches() {
            var orgMatchingExpr = /<D6>|<D106>|<D109>|<EA243>|<EA86>|<EA242>|<EA541>/;
            var metaText = $('meta[name="govuk:analytics:organisations"]').attr('content') || "";
            return orgMatchingExpr.test(metaText);
          }

          return (sectionMatches() || organisationMatches() || breadcrumbMatches());
        },
        startTime: new Date("January 30, 2017").getTime(),
        endTime: new Date("February 5, 2017 23:59:59").getTime()
      },
      {
        url: 'https://www.smartsurvey.co.uk/s/6YYKX/',
        identifier: 'ons_survey',
        template: '<section id="user-satisfaction-survey" class="visible" aria-hidden="false">' +
                  '  <div class="wrapper">' +
                  '    <h1>Tell us what you think of GOV.UK</h1>' +
                  '    <p class="right"><a href="#survey-no-thanks" id="survey-no-thanks">No thanks</a></p>' +
                  '    <p><a href="javascript:void()" id="take-survey" target="_blank" rel="noopener noreferrer">Give us your feedback on government statistical data</a> This will open a short survey on another website</p>' +
                  '  </div>' +
                  '</section>',
        frequency: 1,
        activeWhen: function() {
          function pathMatches() {
            return /^\/government\/statistics\/?$/.test(userSurveys.currentPath());
          }

          return pathMatches();
        },
        startTime: new Date("January 25, 2017").getTime(),
        endTime: new Date("February 27, 2017 23:59:59").getTime()
      }
    ],

    init: function() {
      var activeSurvey = userSurveys.getActiveSurvey(userSurveys.defaultSurvey, userSurveys.smallSurveys);
      if (userSurveys.isSurveyToBeDisplayed(activeSurvey)) {
        userSurveys.displaySurvey(activeSurvey);
      }
    },

    getActiveSurvey: function(defaultSurvey, smallSurveys) {
      var activeSurvey = defaultSurvey;

      $.each(smallSurveys, function(_index, survey) {
        if(userSurveys.currentTime() >= survey.startTime && userSurveys.currentTime() <= survey.endTime) {
          if(typeof(survey.activeWhen) === 'function') {
            if(survey.activeWhen()) { activeSurvey = survey; }
          } else {
            activeSurvey = survey;
          }
        }
      });

      return activeSurvey;
    },

    displaySurvey: function(survey) {
      $("#user-satisfaction-survey-container").append(survey.template);
      userSurveys.setEventHandlers(survey);

      var $surveyLink = $('#take-survey');
      var surveyUrl = survey.url;

      // Survey monkey can record the URL of the survey link if passed through as a query param
      if ((/surveymonkey/.test(surveyUrl)) && (surveyUrl.indexOf('?c=') === -1)) {
        surveyUrl += "?c=" + root.location.pathname;
      }

      $surveyLink.attr('href', surveyUrl);
      userSurveys.trackEvent(survey.identifier, 'banner_shown', 'Banner has been shown');
    },

    setEventHandlers: function(survey) {
      var $noThanks = $('#survey-no-thanks');
      var $takeSurvey = $('#take-survey');

      $noThanks.click(function (e) {
        userSurveys.setSurveyTakenCookie(survey);
        userSurveys.trackEvent(survey.identifier, 'banner_no_thanks', 'No thanks clicked');
        e.stopPropagation();
        return false;
      });
      $takeSurvey.click(function () {
        userSurveys.setSurveyTakenCookie(survey);
        userSurveys.trackEvent(survey.identifier, 'banner_taken', 'User taken survey');
      });
    },

    isSurveyToBeDisplayed: function(survey) {
      if (userSurveys.pathInBlacklist()) {
        return false;
      } else if (userSurveys.otherNotificationVisible() ||
          GOVUK.cookie(userSurveys.surveyTakenCookieName(survey)) === 'true') {
        return false;
      } else if (userSurveys.userCompletedTransaction()) {
        // We don't want any survey appearing for users who have completed a
        // transaction as they may complete the survey with the department's
        // transaction in mind as opposed to the GOV.UK content.
        return false;
      } else if ($('#user-satisfaction-survey-container').length <= 0) {
        return false;
      } else if (userSurveys.randomNumberMatches(survey.frequency)) {
        return true;
      } else {
        return false;
      }
    },

    pathInBlacklist: function() {
      var blackList = new RegExp('^/(?:'
        + /service-manual/.source
        // add more blacklist paths in the form:
        // + /|path-to\/blacklist/.source
        + ')(?:\/|$)'
      );
      return blackList.test(userSurveys.currentPath());
    },

    userCompletedTransaction: function() {
      var path = userSurveys.currentPath();

      function stringContains(str, substr) {
        return str.indexOf(substr) > -1;
      }

      if (stringContains(path, "/done") ||
          stringContains(path, "/transaction-finished") ||
          stringContains(path, "/driving-transaction-finished")) {
            return true;
      }
    },

    trackEvent: function (identifier, action, label) {
      GOVUK.analytics.trackEvent(identifier, action, {
        label: label,
        value: 1,
        nonInteraction: true
      });
    },

    setSurveyTakenCookie: function (survey) {
      GOVUK.cookie(userSurveys.surveyTakenCookieName(survey), true, { days: 30*4 });
      $("#user-satisfaction-survey").removeClass('visible').attr('aria-hidden', 'true');
    },

    randomNumberMatches: function(frequency) {
      return (Math.floor(Math.random() * frequency) === 0);
    },

    otherNotificationVisible: function() {
      return $('#banner-notification:visible, #global-cookie-message:visible, #global-browser-prompt:visible').length > 0;
    },

    surveyTakenCookieName: function(survey) {
      //user_satisfaction_survey => takenUserSatisfactionSurvey
      var cookieStr = "taken_" + survey.identifier;
      var cookieStub = cookieStr.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();});
      return "govuk_" + cookieStub;
    },

    currentTime: function() { return new Date().getTime(); },
    currentPath: function() { return window.location.pathname; }
  };

  root.GOVUK.userSurveys = userSurveys;
}).call(this);

