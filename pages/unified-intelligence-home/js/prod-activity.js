(function () {
  'use strict';

  var ICON_BUILDING = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="2" y="4" width="12" height="10" rx="1"/><path d="M5 4V3a3 3 0 0 1 6 0v1"/></svg>';
  var ICON_PLAY = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M4 3.5v9l8-4.5-8-4.5z"/></svg>';
  var ICON_RADAR = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><circle cx="8" cy="8" r="5.5"/><path d="M8 8L11 5"/><circle cx="8" cy="8" r="1.2" fill="currentColor" stroke="none"/></svg>';
  var ICON_ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var LEFT_OFF = [
    {
      id: 'meridian-apex',
      name: 'Meridian Apex Consulting Ltd.',
      tag: 'Assess business risk',
      tagTone: 'risk',
      step: 'Stopped at ownership review',
      progress: 65,
    },
    {
      id: 'pacific-ridge',
      name: 'Pacific Ridge Financial Inc.',
      tag: 'Investigate fraud',
      tagTone: 'fraud',
      step: 'Stopped at sanctions check',
      progress: 30,
    },
    {
      id: 'crown-bridge',
      name: 'Crown Bridge Advisory Ltd.',
      tag: 'Understand ownership',
      tagTone: 'ownership',
      step: 'Stopped at UBO discovery',
      progress: 80,
    },
  ];

  var MONITORING = [
    {
      id: 'alert-meridian',
      name: 'Meridian Apex Consulting',
      event: 'New UBO flagged — ownership change detected',
      severity: 'high',
      time: '2h ago',
    },
    {
      id: 'alert-pacific',
      name: 'Pacific Ridge Financial',
      event: 'Sanctions list — indirect exposure',
      severity: 'medium',
      time: '5h ago',
    },
    {
      id: 'alert-northgate',
      name: 'Northgate Capital Group',
      event: 'Address mismatch detected',
      severity: 'medium',
      time: '1d ago',
    },
    {
      id: 'alert-crown',
      name: 'Crown Bridge Advisory',
      event: 'Periodic review due',
      severity: 'low',
      time: '2d ago',
    },
  ];

  var leftOffList = document.getElementById('leftOffList');
  var monitoringList = document.getElementById('monitoringList');

  function renderLeftOff() {
    if (!leftOffList) return;

    leftOffList.innerHTML = LEFT_OFF.map(function (item) {
      return (
        '<div class="activity-row" data-activity-id="' + item.id + '">' +
          '<div class="activity-row__icon">' + ICON_BUILDING + '</div>' +
          '<div class="activity-row__main">' +
            '<div class="activity-row__name">' + item.name + '</div>' +
            '<div class="activity-row__meta">' +
              '<span class="activity-tag activity-tag--' + item.tagTone + '">' + item.tag + '</span>' +
              '<span class="activity-row__step">' + item.step + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="activity-row__progress">' +
            '<div class="activity-progress-track"><div class="activity-progress-fill" style="width:' + item.progress + '%"></div></div>' +
            '<span class="activity-progress-label">' + item.progress + '%</span>' +
          '</div>' +
          '<button class="activity-row__resume" type="button" data-resume-id="' + item.id + '">' +
            'Resume ' + ICON_ARROW +
          '</button>' +
        '</div>'
      );
    }).join('');
  }

  function renderMonitoring() {
    if (!monitoringList) return;

    monitoringList.innerHTML = MONITORING.map(function (item) {
      var severityLabel = item.severity.charAt(0).toUpperCase() + item.severity.slice(1);
      return (
        '<div class="monitor-row" data-alert-id="' + item.id + '">' +
          '<span class="monitor-dot monitor-dot--' + item.severity + '" aria-hidden="true"></span>' +
          '<span class="monitor-row__name">' + item.name + '</span>' +
          '<span class="monitor-row__event">' + item.event + '</span>' +
          '<span class="monitor-badge monitor-badge--' + item.severity + '">' + severityLabel + '</span>' +
          '<span class="monitor-row__time">' + item.time + '</span>' +
        '</div>'
      );
    }).join('');
  }

  function scrollToHero() {
    var hero = document.querySelector('.hero-zone');
    if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (leftOffList) {
    leftOffList.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-resume-id]');
      if (!btn) return;
      scrollToHero();
    });
  }

  renderLeftOff();
  renderMonitoring();
})();
