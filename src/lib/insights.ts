const insightData = {
  uploaded_at: "2024-10-08T15:17:15.343Z",
  insights: [
    {
      id: "cd482216653cc68a2affe0e55768e2ac",
      element_type: "Hero Headline",
      severity: 100,
      template:
        "Test adding a headline title above the fold. Featuring headline text in a prominent position may increase user engagement.",
      selector:
        'h2[class="max-w-ch-14 gsap-slide"][classification-group="headline"][internal-classification="Headline 1"][classification-src="cnn"][classification="Headline 1"]',
      all_targets: [],
      use_targets: false,
      recommendation:
        "Experiment with placing a headline title above the fold to see if it enhances user engagement.",
      metadata: {
        rule_id: 4,
        template_id: "r4.7",
      },
      created: "2024-10-08T15:17:10.381Z",
    },
    {
      id: "b7783785dbca26aa4a75b938c6b2efe9",
      element_type: "Hero Button",
      severity: 70,
      template:
        "Your Hero Button is below your Average Scroll Depth of 640 pixels. Test moving this button higher on the page by making other elements smaller or prioritizing this button.",
      selector:
        'a[href="https://www.heatmap.com/pricing"][class="button gsap-slide w-button"][classification-group="cta"][internal-classification="Hero Button 1"][classification-src="cnn"][classification="Hero Button 1"]',
      all_targets: [
        {
          selector:
            'a[href="https://www.heatmap.com/pricing"][class="button gsap-slide w-button"][classification-group="cta"][internal-classification="Hero Button 1"][classification-src="cnn"][classification="Hero Button 1"]',
          elementName: "hero button 1",
        },
      ],
      use_targets: false,
      recommendation:
        "Your Hero Button is currently positioned below the average scroll depth of 640 pixels. Consider testing a higher placement by resizing other elements or prioritizing this button's visibility.",
      metadata: {
        rule_id: 4,
        template_id: "r4.13",
      },
      created: "2024-10-08T15:17:10.381Z",
    },
    {
      id: "38602f5df8cf183ac307f9ed17500828",
      element_type: "Hamburger Menu",
      severity: 70,
      template:
        "Test moving your mobile menu navigation to the left side of the header. The majority of users are right handed, making the left side menu easier for the right thumb to click. Left side menu location is also a common design pattern increasing user familiarity.",
      selector:
        'div[class="navbar2_menu-button w-nav-button"][aria-label="menu"][role="button"][tabindex="0"][aria-controls="w-nav-overlay-0"][aria-haspopup="menu"][aria-expanded="false"][cnn-preprocessor="Button"][classification-group="button"][internal-classification=" Button 10"][classification-src="pre-proc"][classification=" Button 10"]',
      all_targets: [
        {
          selector:
            'div[class="navbar2_menu-button w-nav-button"][aria-label="menu"][role="button"][tabindex="0"][aria-controls="w-nav-overlay-0"][aria-haspopup="menu"][aria-expanded="false"][cnn-preprocessor="Button"][classification-group="button"][internal-classification=" Button 10"][classification-src="pre-proc"][classification=" Button 10"]',
          elementName: "header nav button",
        },
      ],
      use_targets: false,
      recommendation:
        "Consider relocating your mobile menu navigation to the left side of the header. This position is more accessible for the right thumb of most right-handed users and aligns with common design patterns, enhancing user familiarity.",
      metadata: {
        rule_id: 11,
        template_id: "r11.9",
      },
      created: "2024-10-08T15:17:10.381Z",
    },
    {
      id: "e4a13c903a01903c60c5768d4b6cc638",
      element_type: "Sentences",
      severity: 60,
      template:
        "Test reducing your sentences to a maximum of 15 words. The sentence [heatmap is the...] is above the recommended word count as discovered in Baymard and Google user experience studies.",
      selector: 'div[class="w-layout-vflex max-wherop"]',
      all_targets: [
        {
          selector: 'div[class="w-layout-vflex max-wherop"]',
        },
        {
          selector: 'div[class="bento_grid_card_content z-index-1 is-2"]',
        },
        {
          selector: 'div[class="bento_grid_card_content z-index-1 is-2"]',
        },
        {
          selector:
            'div[class="bento_grid_card_content z-index-1 text-color-white smaller"]',
        },
        {
          selector:
            'div[class="bento_grid_card_content z-index-1 is-2 text-color-white"]',
        },
        {
          selector:
            'div[class="bento_grid_card_content z-index-1 text-color-white"]',
        },
        {
          selector:
            'div[class="bento_grid_card_content z-index-1 is-3 text-color-white"]',
        },
        {
          selector: 'div[class="client_p"]',
        },
        {
          selector: 'div[class="client_p"]',
        },
        {
          selector: 'div[class="client_p"]',
        },
        {
          selector: 'div[class="client_p"]',
        },
        {
          selector: 'div[class="client_p"]',
        },
        {
          selector: 'div[class="client_p"]',
        },
        {
          selector: 'div[class="client_p"]',
        },
        {
          selector: 'div[class="layout16_content max-width-xmedium"]',
        },
        {
          selector:
            'div[id="w-node-b10d3873-b2de-3d88-685c-454b738af508-03b1623d"][class="swiper-grid_card"]',
        },
        {
          selector: 'div[class="client_wrap is-auto"]',
        },
        {
          selector: 'div[class="max-width-large"]',
        },
        {
          selector: 'div[class="max-width-large"]',
        },
        {
          selector: 'div[id="hs-eu-policy-wording"][tabindex="0"]',
        },
        {
          selector: 'div[class="max-width-medium upad32"]',
        },
        {
          selector: "html > body > div > div:nth-child(1) > div:nth-child(1)",
        },
      ],
      use_targets: false,
      recommendation:
        "Reduce sentences to a maximum of 15 words for better user experience, as shown in the sentence [heatmap is the...], which exceeds this limit according to Baymard and Google studies.",
      metadata: {
        rule_id: 11,
        template_id: "r11.36",
      },
      created: "2024-10-08T15:17:10.381Z",
    },
  ],
  url: "https://www.heatmap.com",
  id: "122d0d91-0abd-4f23-bfc1-ba10fff7bc44",
};

export default insightData;
