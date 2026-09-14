(function () {
  'use strict';

  var CHECK_SVG = '<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8l3.5 3.5L13 5"/></svg>';
  var TAG_REMOVE_SVG = '<svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M2 2l6 6M8 2l-6 6"/></svg>';
  var EXTERNAL_LINK_SVG = '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 3.5h3v3M12.5 3.5 8 8"/><path d="M10.5 7.5v4a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h4"/></svg>';
  var EXPERIENCE_TYPE_META = {
    live: { tag: 'Live', tone: 'live' },
    demo: { tag: 'Demo', tone: 'demo' },
    external: { tag: 'External', tone: 'external' }
  };

  var CARD_ICONS = {
    'document-verification': '<svg width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 0H24C25.6406 0 27 1.35938 27 3V18C27 19.6406 25.6406 21 24 21H3C1.35938 21 0 19.6406 0 18V3C0 1.35938 1.35938 0 3 0ZM6.75 12C4.6875 12 3 13.6875 3 15.75C3 16.1719 3.32812 16.5 3.75 16.5H12.75C13.1719 16.5 13.5 16.1719 13.5 15.75C13.5 13.6875 11.8125 12 9.75 12H6.75ZM5.625 7.5C5.625 8.95312 6.79688 10.125 8.25 10.125C9.70312 10.125 10.875 8.95312 10.875 7.5C10.875 6.04688 9.70312 4.875 8.25 4.875C6.79688 4.875 5.625 6.04688 5.625 7.5ZM16.875 5.25C16.2656 5.25 15.75 5.76562 15.75 6.375C15.75 6.98438 16.2656 7.5 16.875 7.5H22.125C22.7344 7.5 23.25 6.98438 23.25 6.375C23.25 5.76562 22.7344 5.25 22.125 5.25H16.875ZM16.875 9.75C16.2656 9.75 15.75 10.2656 15.75 10.875C15.75 11.4844 16.2656 12 16.875 12H22.125C22.7344 12 23.25 11.4844 23.25 10.875C23.25 10.2656 22.7344 9.75 22.125 9.75H16.875Z" fill="currentColor"/></svg>',
    'bank-verification': '<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12.8906 0.9375L23.3906 6.9375C23.9531 7.26562 24.2812 7.96875 24.0938 8.625C23.9062 9.28125 23.3438 9.75 22.6406 9.75H21.1406V19.5L23.5312 21.2812C23.9062 21.5625 24.1406 22.0312 24.1406 22.5C24.1406 23.3438 23.4844 24 22.6406 24H1.64062C0.796875 24 0.140625 23.3438 0.140625 22.5C0.140625 22.0312 0.375 21.5625 0.75 21.2812L3.14062 19.5V9.75H1.64062C0.984375 9.75 0.375 9.28125 0.1875 8.625C0 7.96875 0.328125 7.26562 0.890625 6.9375L11.3906 0.9375C11.8594 0.703125 12.4219 0.703125 12.8906 0.9375ZM18.8906 9.75H15.8906V19.5H18.8906V9.75ZM13.6406 9.75H10.6406V19.5H13.6406V9.75ZM8.39062 9.75H5.39062V19.5H8.39062V9.75ZM12.1406 4.5C11.2969 4.5 10.6406 5.15625 10.6406 6C10.6406 6.84375 11.2969 7.5 12.1406 7.5C12.9844 7.5 13.6406 6.84375 13.6406 6C13.6406 5.15625 12.9844 4.5 12.1406 4.5Z" fill="currentColor"/></svg>',
    'electronic-id': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.25 12V13.875C2.25 14.4844 1.73438 15 1.125 15C0.515625 15 0 14.4844 0 13.875V12C0 5.39062 5.39062 0 12 0C15.6562 0 18.8906 1.64062 21.0938 4.17188C21.5156 4.64062 21.4688 5.39062 21 5.76562C20.5312 6.1875 19.7812 6.14062 19.4062 5.67188C17.625 3.5625 14.9531 2.25 12 2.25C6.60938 2.25 2.25 6.60938 2.25 12ZM23.7656 9.51562C23.9062 10.3125 24 11.1562 24 12V13.875C24 14.4844 23.4844 15 22.875 15C22.2656 15 21.75 14.4844 21.75 13.875V12C21.75 11.2969 21.7031 10.6406 21.5625 9.98438C21.4219 9.375 21.7969 8.76562 22.4062 8.67188C23.0156 8.53125 23.625 8.90625 23.7656 9.51562ZM12 3.75C16.5469 3.75 20.25 7.45312 20.25 12V13.1719C20.25 14.4844 20.1562 15.75 20.0156 17.0625C19.9688 17.5781 19.5 18 18.9375 18C18.2344 18 17.7188 17.3906 17.8125 16.6875C17.9531 15.5156 18 14.3438 18 13.1719V12C18 8.67188 15.3281 6 12 6C11.4375 6 10.9219 6.09375 10.4531 6.1875C9.9375 6.32812 9.375 6.23438 9.04688 5.85938C8.57812 5.25 8.71875 4.40625 9.46875 4.17188C10.2656 3.89062 11.1094 3.75 12 3.75ZM7.07812 6.98438C7.45312 7.40625 7.40625 8.0625 7.07812 8.57812C6.42188 9.5625 6 10.7344 6 12V13.1719C6 14.5312 5.85938 15.8906 5.53125 17.2031C5.4375 17.6719 5.01562 18 4.5 18C3.75 18 3.23438 17.25 3.375 16.5469C3.60938 15.4219 3.75 14.2969 3.75 13.1719V12C3.75 10.0781 4.40625 8.34375 5.48438 6.9375C5.85938 6.42188 6.65625 6.46875 7.07812 6.98438ZM12 7.5C14.4844 7.5 16.5 9.51562 16.5 12V13.1719C16.5 15.0469 16.3125 16.875 15.9375 18.7031C15.8438 19.1719 15.4688 19.5 14.9531 19.5C14.2969 19.5 13.8281 18.8906 13.9688 18.2344C14.2969 16.5469 14.4375 14.8594 14.4375 13.1719V12C14.4375 10.6406 13.3594 9.5625 12 9.5625C10.6406 9.5625 9.5625 10.6406 9.5625 12V13.1719C9.5625 15.0469 9.32812 16.9688 8.8125 18.7969C8.71875 19.2188 8.29688 19.5 7.875 19.5C7.17188 19.5 6.65625 18.7969 6.84375 18.1406C7.26562 16.5 7.5 14.8594 7.5 13.1719V12C7.5 9.51562 9.51562 7.5 12 7.5ZM13.125 12V13.1719C13.125 16.2656 12.5625 19.3125 11.4375 22.1719L11.1562 22.9219C10.9688 23.4844 10.3125 23.7656 9.70312 23.5312C9.14062 23.3438 8.85938 22.6875 9.09375 22.0781L9.375 21.375C10.3594 18.75 10.875 15.9844 10.875 13.1719V12C10.875 11.3906 11.3906 10.875 12 10.875C12.6094 10.875 13.125 11.3906 13.125 12Z" fill="currentColor"/></svg>',
    'kyc-eidas': '<svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 0H16.5C18.1406 0 19.5 1.35938 19.5 3V21C19.5 22.6406 18.1406 24 16.5 24H3C1.35938 24 0 22.6406 0 21V3C0 1.35938 1.35938 0 3 0ZM8.25 13.5C6.1875 13.5 4.5 15.1875 4.5 17.25C4.5 17.6719 4.82812 18 5.25 18H14.25C14.6719 18 15 17.6719 15 17.25C15 15.1875 13.3125 13.5 11.25 13.5H8.25ZM7.125 9C7.125 10.4531 8.29688 11.625 9.75 11.625C11.2031 11.625 12.375 10.4531 12.375 9C12.375 7.54688 11.2031 6.375 9.75 6.375C8.29688 6.375 7.125 7.54688 7.125 9ZM22.5 3.75V6.75C22.5 7.17188 22.1719 7.5 21.75 7.5C21.3281 7.5 21 7.17188 21 6.75V3.75C21 3.32812 21.3281 3 21.75 3C22.1719 3 22.5 3.32812 22.5 3.75ZM22.5 9.75V12.75C22.5 13.1719 22.1719 13.5 21.75 13.5C21.3281 13.5 21 13.1719 21 12.75V9.75C21 9.32812 21.3281 9 21.75 9C22.1719 9 22.5 9.32812 22.5 9.75ZM21.75 15C22.1719 15 22.5 15.3281 22.5 15.75V18.75C22.5 19.1719 22.1719 19.5 21.75 19.5C21.3281 19.5 21 19.1719 21 18.75V15.75C21 15.3281 21.3281 15 21.75 15Z" fill="currentColor"/></svg>',
    'device-intelligence': '<svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 0H13.5C15.1406 0 16.5 1.35938 16.5 3V21C16.5 22.6406 15.1406 24 13.5 24H3C1.35938 24 0 22.6406 0 21V3C0 1.35938 1.35938 0 3 0ZM6.375 19.5C5.76562 19.5 5.25 20.0156 5.25 20.625C5.25 21.2344 5.76562 21.75 6.375 21.75H10.125C10.7344 21.75 11.25 21.2344 11.25 20.625C11.25 20.0156 10.7344 19.5 10.125 19.5H6.375Z" fill="currentColor"/></svg>',
    'business-reputation-review': '<svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M0 3C0 1.35938 1.35938 0 3 0H10.0312C10.8281 0 11.5781 0.328125 12.1406 0.890625L17.1094 5.85938C17.6719 6.42188 18 7.21875 18 8.01562V21C18 22.6406 16.6406 24 15 24H3C1.35938 24 0 22.6406 0 21V3ZM9.75 2.76562V7.125C9.75 7.73438 10.2656 8.25 10.875 8.25H15.2812L9.75 2.76562ZM12.75 15C12.75 12.5156 10.7344 10.5 8.25 10.5C5.76562 10.5 3.75 12.5156 3.75 15C3.75 17.4844 5.76562 19.5 8.25 19.5C9.09375 19.5 9.84375 19.2656 10.5469 18.8906L12.3281 20.6719C12.75 21.1406 13.5 21.1406 13.9219 20.6719C14.3438 20.25 14.3438 19.5469 13.9219 19.0781L12.1406 17.2969C12.5156 16.6406 12.75 15.8438 12.75 15ZM8.25 12.75C9.51562 12.75 10.5 13.7344 10.5 15C10.5 16.2656 9.51562 17.25 8.25 17.25C6.98438 17.25 6 16.2656 6 15C6 13.7344 6.98438 12.75 8.25 12.75Z" fill="currentColor"/></svg>',
    'trulioo-mcp-agent': '<svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 5.01562V9.60938C12.8906 10.0312 13.5 10.9688 13.5 12C13.5 12.0469 13.5 12.1406 13.5 12.1875L17.25 14.3438C17.3906 14.25 17.4844 14.2031 17.625 14.1094V9.89062C17.4844 9.79688 17.3906 9.75 17.25 9.65625L14.8594 11.0156C14.7188 10.2656 14.2969 9.5625 13.7812 9.04688L16.125 7.6875C16.0781 6.75 16.5469 5.76562 17.4375 5.25C18.7031 4.5 20.2969 4.92188 21 6.1875C21.75 7.45312 21.3281 9.04688 20.0625 9.79688C20.0156 9.79688 19.9219 9.84375 19.875 9.89062V14.1094C19.9219 14.1562 20.0156 14.2031 20.0625 14.25C21.3281 14.9531 21.75 16.5469 21 17.8125C20.2969 19.0781 18.7031 19.5 17.4375 18.7969C16.5469 18.2344 16.0312 17.2969 16.125 16.3125L12.375 14.1562C12.2344 14.25 12.1406 14.2969 12 14.3906V18.9844C12.8906 19.4062 13.5 20.3438 13.5 21.375C13.5 22.8281 12.3281 24 10.875 24C9.42188 24 8.25 22.8281 8.25 21.375C8.25 20.3438 8.85938 19.4062 9.75 18.9844V14.3906C8.85938 13.9688 8.25 13.0312 8.25 12C8.25 11.9531 8.25 11.8594 8.25 11.8125L4.5 9.65625C4.40625 9.75 4.26562 9.79688 4.125 9.89062V14.1094C4.26562 14.2031 4.35938 14.25 4.5 14.3438L6.89062 12.9844C7.03125 13.7344 7.45312 14.4375 7.96875 14.9531L5.625 16.3125C5.67188 17.2969 5.20312 18.2344 4.3125 18.7969C3.04688 19.5 1.45312 19.0781 0.75 17.8125C0 16.5469 0.421875 14.9531 1.6875 14.25C1.73438 14.2031 1.82812 14.1562 1.875 14.1094V9.89062C1.82812 9.84375 1.73438 9.79688 1.6875 9.79688C0.421875 9.04688 0 7.45312 0.75 6.1875C1.45312 4.92188 3.04688 4.5 4.3125 5.25C5.20312 5.76562 5.71875 6.75 5.625 7.6875L9.375 9.84375C9.51562 9.75 9.60938 9.70312 9.75 9.60938V5.01562C8.85938 4.59375 8.25 3.65625 8.25 2.625C8.25 1.17188 9.42188 0 10.875 0C12.3281 0 13.5 1.17188 13.5 2.625C13.5 3.65625 12.8906 4.59375 12 5.01562Z" fill="currentColor"/></svg>',
    'ubo-agent': '<svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 5.25C3 2.34375 5.34375 0 8.25 0C11.1562 0 13.5 2.34375 13.5 5.25C13.5 8.15625 11.1562 10.5 8.25 10.5C5.34375 10.5 3 8.15625 3 5.25ZM0 21C0 16.4531 3.70312 12.75 8.25 12.75C12.7969 12.75 16.5 16.4531 16.5 21V21.2812C16.5 22.3594 15.6094 23.25 14.5312 23.25H1.96875C0.890625 23.25 0 22.3594 0 21.2812V21ZM20.25 2.25C22.7344 2.25 24.75 4.26562 24.75 6.75C24.75 9.23438 22.7344 11.25 20.25 11.25C17.7656 11.25 15.75 9.23438 15.75 6.75C15.75 4.26562 17.7656 2.25 20.25 2.25ZM20.25 13.5C24 13.5 27 16.5469 27 20.25V21.2812C27 22.3594 26.1094 23.25 25.0312 23.25H18.2812C18.5625 22.6875 18.75 21.9844 18.75 21.2812V21C18.75 18.6094 17.9531 16.3594 16.5938 14.5781C17.625 13.9219 18.8906 13.5 20.25 13.5Z" fill="currentColor"/></svg>',
    'policy-review': '<svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M0 3C0 1.35938 1.35938 0 3 0H10.0312C10.8281 0 11.5781 0.328125 12.1406 0.890625L17.1094 5.85938C17.6719 6.42188 18 7.21875 18 8.01562V21C18 22.6406 16.6406 24 15 24H3C1.35938 24 0 22.6406 0 21V3ZM9.75 2.76562V7.125C9.75 7.73438 10.2656 8.25 10.875 8.25H15.2812L9.75 2.76562ZM5.625 12C5.01562 12 4.5 12.5156 4.5 13.125C4.5 13.7344 5.01562 14.25 5.625 14.25H12.375C12.9844 14.25 13.5 13.7344 13.5 13.125C13.5 12.5156 12.9844 12 12.375 12H5.625ZM5.625 16.5C5.01562 16.5 4.5 17.0156 4.5 17.625C4.5 18.2344 5.01562 18.75 5.625 18.75H12.375C12.9844 18.75 13.5 18.2344 13.5 17.625C13.5 17.0156 12.9844 16.5 12.375 16.5H5.625Z" fill="currentColor"/></svg>',
    'deep-search': '<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M19.5 9.75C19.5 11.9062 18.7969 13.875 17.625 15.5156L23.5781 21.4219C24.1406 22.0312 24.1406 22.9688 23.5781 23.5781C22.9688 24.1406 22.0312 24.1406 21.4219 23.5781L15.5156 17.625C13.875 18.7969 11.9062 19.5 9.75 19.5C4.35938 19.5 0 15.1406 0 9.75C0 4.35938 4.35938 0 9.75 0C15.1406 0 19.5 4.35938 19.5 9.75ZM9.75 16.5C13.5 16.5 16.5 13.5 16.5 9.75C16.5 6 13.5 3 9.75 3C6 3 3 6 3 9.75C3 13.5 6 16.5 9.75 16.5Z" fill="currentColor"/></svg>',
    'kyb-self-serve': '<svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 0H15C16.6406 0 18 1.35938 18 3V21C18 22.6406 16.6406 24 15 24H3C1.35938 24 0 22.6406 0 21V3C0 1.35938 1.35938 0 3 0ZM8.25 16.5C7.40625 16.5 6.75 17.1562 6.75 18V21.75H11.25V18C11.25 17.1562 10.5938 16.5 9.75 16.5H8.25ZM4.5 5.25V6.75C4.5 7.17188 4.82812 7.5 5.25 7.5H6.75C7.17188 7.5 7.5 7.17188 7.5 6.75V5.25C7.5 4.82812 7.17188 4.5 6.75 4.5H5.25C4.82812 4.5 4.5 4.82812 4.5 5.25ZM11.25 4.5C10.8281 4.5 10.5 4.82812 10.5 5.25V6.75C10.5 7.17188 10.8281 7.5 11.25 7.5H12.75C13.1719 7.5 13.5 7.17188 13.5 6.75V5.25C13.5 4.82812 13.1719 4.5 12.75 4.5H11.25ZM4.5 11.25V12.75C4.5 13.1719 4.82812 13.5 5.25 13.5H6.75C7.17188 13.5 7.5 13.1719 7.5 12.75V11.25C7.5 10.8281 7.17188 10.5 6.75 10.5H5.25C4.82812 10.5 4.5 10.8281 4.5 11.25ZM11.25 10.5C10.8281 10.5 10.5 10.8281 10.5 11.25V12.75C10.5 13.1719 10.8281 13.5 11.25 13.5H12.75C13.1719 13.5 13.5 13.1719 13.5 12.75V11.25C13.5 10.8281 13.1719 10.5 12.75 10.5H11.25Z" fill="currentColor"/></svg>'
  };

  var FILTER_CONFIG = [
    { key: 'experienceType', label: 'Experience Type', items: labsFilterGroups.experienceType },
    { key: 'useCase', label: 'Use Case', items: labsFilterGroups.useCase }
  ];

  var state = {
    search: '',
    experienceType: {},
    useCase: {}
  };

  var els = {
    filterBar: document.getElementById('labsFilterBar'),
    filterMenu: document.getElementById('labsFilterMenu'),
    activeFilters: document.getElementById('labsActiveFilters'),
    search: document.getElementById('labsSearchInput'),
    searchClear: document.getElementById('labsSearchClear'),
    featuredSection: document.getElementById('labsFeaturedSection'),
    featured: document.getElementById('labsFeaturedRow'),
    browseSection: document.getElementById('labsBrowseSection'),
    browseTitle: document.getElementById('labsBrowseTitle'),
    grid: document.getElementById('labsGrid')
  };

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function filterItemValue(item) {
    return typeof item === 'string' ? item : item.id;
  }

  function filterItemLabel(item) {
    return typeof item === 'string' ? item : item.label;
  }

  function labelFor(groupKey, value) {
    var config = FILTER_CONFIG.find(function (item) { return item.key === groupKey; });
    if (!config) return value;
    var match = config.items.find(function (item) { return filterItemValue(item) === value; });
    return match ? filterItemLabel(match) : value;
  }

  function getGroupState(key) {
    return state[key] || {};
  }

  function selectedKeys(key) {
    return Object.keys(getGroupState(key)).filter(function (k) { return getGroupState(key)[k]; });
  }

  function typeMeta(id) {
    return EXPERIENCE_TYPE_META[id] || { tag: id, tone: 'external' };
  }

  function experienceFilterKey(item) {
    if (item.badge === 'demo' || item.badge === 'external') return item.badge;
    return 'live';
  }

  function hasActiveFilters() {
    if (state.search.trim()) return true;
    return FILTER_CONFIG.some(function (config) { return selectedKeys(config.key).length > 0; });
  }

  function matchesFilters(item) {
    var q = state.search.trim().toLowerCase();
    var typeKey = experienceFilterKey(item);
    var type = typeMeta(typeKey);
    if (q) {
      var hay = [
        item.title,
        item.description,
        type.tag,
        labelFor('experienceType', typeKey),
        item.useCase,
        (item.tags || []).join(' ')
      ].join(' ').toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }

    var typeKeys = selectedKeys('experienceType');
    if (typeKeys.length && typeKeys.indexOf(typeKey) === -1) return false;

    var useCaseKeys = selectedKeys('useCase');
    if (useCaseKeys.length) {
      var itemTags = item.tags && item.tags.length ? item.tags : [item.useCase];
      var matchesUseCase = useCaseKeys.indexOf(item.useCase) !== -1 ||
        useCaseKeys.some(function (key) { return itemTags.indexOf(key) !== -1; });
      if (!matchesUseCase) return false;
    }

    return true;
  }

  function sortByOrder(items) {
    return items.slice().sort(function (a, b) {
      return (a.order || 0) - (b.order || 0);
    });
  }

  function hasLink(item) {
    return !!(item.url && item.url !== '#');
  }

  function wrapCard(item, className, inner) {
    if (hasLink(item)) {
      return '<a class="' + className + '" href="' + escapeHtml(item.url) + '">' + inner + '</a>';
    }
    return '<div class="' + className + ' labs-card--static" role="group">' + inner + '</div>';
  }

  function cardIcon(item) {
    return CARD_ICONS[item.icon] || '';
  }

  function cardTags(item) {
    var tags = item.tags && item.tags.length ? item.tags : [item.useCase];
    return tags.map(function (tag) {
      return '<span class="tds-tag tds-tag--md tds-tag--default">' + escapeHtml(tag) + '</span>';
    }).join('');
  }

  function cardBadge(item) {
    var tone = item.badge;
    if (!tone) return '';
    var type = typeMeta(tone);
    return (
      '<span class="labs-card-badge labs-card-badge--' + type.tone + '">' +
        '<span class="labs-card-badge__dot" aria-hidden="true"></span>' +
        '<span>' + escapeHtml(type.tag) + '</span>' +
      '</span>'
    );
  }

  function cardHeader(item) {
    var external = item.external
      ? '<span class="labs-card-ext" aria-hidden="true">' + EXTERNAL_LINK_SVG + '</span>'
      : '';
    return (
      '<span class="labs-card-icon" aria-hidden="true">' + cardIcon(item) + '</span>' +
      '<div class="labs-card-copy">' +
        '<div class="labs-card-title-row">' +
          '<h3 class="labs-card-title">' + escapeHtml(item.title) + '</h3>' +
          external +
          cardBadge(item) +
        '</div>' +
        '<p class="labs-card-desc">' + escapeHtml(item.description) + '</p>' +
      '</div>' +
      '<div class="labs-card-tags">' + cardTags(item) + '</div>'
    );
  }

  function renderFeaturedCard(item) {
    var preview = item.preview
      ? '<img src="' + escapeHtml(item.preview) + '" alt="" width="1344" height="900">'
      : '';
    return wrapCard(
      item,
      'labs-featured-card',
      '<div class="labs-featured-card__header">' + cardHeader(item) + '</div>' +
      '<div class="labs-featured-card__preview">' +
        '<div class="labs-featured-card__preview-frame' + (preview ? ' labs-featured-card__preview-frame--shot' : '') + '" aria-hidden="true">' +
          preview +
        '</div>' +
      '</div>'
    );
  }

  function renderExperienceCard(item) {
    return wrapCard(
      item,
      'labs-card',
      '<div class="labs-card__body">' + cardHeader(item) + '</div>'
    );
  }

  function render() {
    var visible = sortByOrder(labsExperiences.filter(matchesFilters));
    var filtering = hasActiveFilters();

    if (els.featuredSection) els.featuredSection.hidden = filtering;
    if (els.browseTitle) els.browseTitle.textContent = filtering ? 'Results' : 'All Experiences';

    if (filtering) {
      if (els.featured) els.featured.innerHTML = '';
      if (els.grid) {
        els.grid.innerHTML = visible.length
          ? visible.map(renderExperienceCard).join('')
          : '<p class="labs-empty">No experiences match your search or filters.</p>';
      }
      return;
    }

    var featured = visible.filter(function (item) { return item.featured; });
    var browse = visible.filter(function (item) { return !item.featured; });

    if (els.featured) {
      els.featured.innerHTML = featured.length
        ? featured.map(renderFeaturedCard).join('')
        : '<p class="labs-empty">No featured experiences available.</p>';
    }

    if (els.grid) {
      els.grid.innerHTML = browse.length
        ? browse.map(renderExperienceCard).join('')
        : '<p class="labs-empty">No experiences available.</p>';
    }
  }

  function allSelectedCount() {
    return FILTER_CONFIG.reduce(function (sum, config) {
      return sum + selectedKeys(config.key).length;
    }, 0);
  }

  function firstSelectedLabel() {
    var first = '';
    FILTER_CONFIG.some(function (config) {
      var keys = selectedKeys(config.key);
      if (!keys.length) return false;
      first = labelFor(config.key, keys[0]);
      return true;
    });
    return first;
  }

  function syncFilterButton() {
    if (!els.filterBar) return;
    var count = allSelectedCount();
    var valueEl = els.filterBar.querySelector('.tds-filter-button__trigger-value');
    var counter = els.filterBar.querySelector('.tds-filter-button__counter');

    els.filterBar.classList.toggle('tds-filter-button--selected', count > 0);
    els.filterBar.classList.toggle('tds-filter-button--multi', count > 1);

    if (valueEl) valueEl.textContent = count ? firstSelectedLabel() : '';
    if (counter) {
      counter.textContent = count > 1 ? '+' + (count - 1) : '';
      counter.hidden = count <= 1;
    }

    if (!els.filterMenu) return;
    els.filterMenu.querySelectorAll('[data-filter-value]').forEach(function (node) {
      var group = node.getAttribute('data-filter-group');
      var value = node.getAttribute('data-filter-value');
      var active = !!getGroupState(group)[value];
      node.classList.toggle('tds-action-list-item--selected', active);
      node.setAttribute('aria-checked', active ? 'true' : 'false');
    });
  }

  function renderActiveChips() {
    if (!els.activeFilters) return;
    var chips = [];
    FILTER_CONFIG.forEach(function (config) {
      selectedKeys(config.key).forEach(function (value) {
        var label = labelFor(config.key, value);
        chips.push(
          '<span class="tds-tag tds-tag--md tds-tag--default tds-tag--removable">' +
            '<span>' + escapeHtml(label) + '</span>' +
            '<button type="button" class="tds-tag__remove" aria-label="Remove ' + escapeHtml(label) + ' filter" data-chip-group="' + config.key + '" data-chip-value="' + escapeHtml(value) + '">' + TAG_REMOVE_SVG + '</button>' +
          '</span>'
        );
      });
    });
    els.activeFilters.innerHTML = chips.join('');
    els.activeFilters.hidden = !chips.length;
  }

  function setFilterValue(groupKey, value, checked) {
    if (checked) state[groupKey][value] = true;
    else delete state[groupKey][value];
    syncFilterButton();
    renderActiveChips();
    render();
  }

  function clearAllFilters() {
    FILTER_CONFIG.forEach(function (config) { state[config.key] = {}; });
    syncFilterButton();
    renderActiveChips();
    render();
  }

  function buildFilterMenu() {
    if (!els.filterMenu) return;
    els.filterMenu.innerHTML = FILTER_CONFIG.map(function (config) {
      var items = config.items.map(function (item) {
        var value = filterItemValue(item);
        var label = filterItemLabel(item);
        return (
          '<button type="button" class="tds-action-list-item" role="menuitemcheckbox" data-filter-group="' + config.key + '" data-filter-value="' + escapeHtml(value) + '" aria-checked="false">' +
            '<span class="tds-action-list-item__label">' + escapeHtml(label) + '</span>' +
            '<span class="tds-action-list-item__trailing-visual" aria-hidden="true">' + CHECK_SVG + '</span>' +
          '</button>'
        );
      }).join('');
      return '<div class="labs-filter-group"><p class="labs-filter-group__label">' + escapeHtml(config.label) + '</p>' + items + '</div>';
    }).join('');
  }

  function syncSearchClear() {
    if (!els.searchClear) return;
    els.searchClear.hidden = !(els.search && els.search.value);
  }

  function clearSearch() {
    if (els.search) els.search.value = '';
    state.search = '';
    syncSearchClear();
    render();
  }

  function bindEvents() {
    if (els.search) {
      els.search.addEventListener('input', function () {
        state.search = els.search.value;
        syncSearchClear();
        render();
      });
    }

    if (els.searchClear) {
      els.searchClear.addEventListener('click', function () {
        clearSearch();
        if (els.search) els.search.focus();
      });
    }

    if (els.filterBar) {
      els.filterBar.addEventListener('tds-filter-clear', function () {
        clearAllFilters();
      });
    }

    if (els.activeFilters) {
      els.activeFilters.addEventListener('click', function (event) {
        var chip = event.target.closest('[data-chip-group]');
        if (!chip) return;
        setFilterValue(chip.getAttribute('data-chip-group'), chip.getAttribute('data-chip-value'), false);
      });
    }
  }

  buildFilterMenu();
  bindEvents();
  if (window.TdsDropdownPanel) {
    window.TdsDropdownPanel.initMenus(document.querySelector('.labs-search-card') || document);
  }
  if (els.filterMenu) {
    els.filterMenu.querySelectorAll('[data-filter-value]').forEach(function (node) {
      node.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        var group = node.getAttribute('data-filter-group');
        var value = node.getAttribute('data-filter-value');
        setFilterValue(group, value, !getGroupState(group)[value]);
      }, true);
    });
  }
  syncFilterButton();
  renderActiveChips();
  syncSearchClear();
  render();
})();
