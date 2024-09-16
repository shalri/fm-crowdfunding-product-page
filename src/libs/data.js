export const navLinks = [
  {
    label: "About",
    href: "/",
  },
  {
    label: "Discover",
    href: "/",
  },
  {
    label: "Get Started",
    href: "/",
  },
];

export const projectDetails = [
  {
    title: "Mastercraft Bamboo Monitor Riser",
    logo: "images/logo-mastercraft.svg",
    bgImage: {
      desktop: "/images/image-hero-desktop.jpg",
      mobile: "/images/image-hero-mobile.jpg",
    },
    description:
      "A beautifully handcrafted monitor stand to reduce neck and eye strain.",
    currentFunding: 89914,
    targetFunding: 100000,
    totalBackers: 5007,
    daysLeft: 56,
    aboutCopy: `The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates your screen to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve your posture and make you more comfortable while at work, helping you stay focused on the task at hand.

Featuring artisan craftsmanship, the simplicity of design creates extra desk space below your computer to allow notepads, pens, and USB sticks to be stored under the stand.`,
    rewards: [
      {
        title: "Pledge with no reward",
        pledgeAmount: 0,
        description:
          "Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product-related communications.",
        left: 0,
        isOutOfStock: false,
      },
      {
        title: "Bamboo Stand",
        pledgeAmount: 25,
        description:
          "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list.",
        left: 101,
        isOutOfStock: false,
      },
      {
        title: "Black Edition Stand",
        pledgeAmount: 75,
        description:
          "You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
        left: 64,
        isOutOfStock: false,
      },
      {
        title: "Mahogany Special Edition",
        pledgeAmount: 200,
        description:
          "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
        left: 0,
        isOutOfStock: true,
      },
    ],
    modal: {
      backThisProjectTitle: "Back this project",
      backThisProjectDescription:
        "Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?",
      noRewardTitle: "Pledge with no reward",
      noRewardDescription:
        "Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email.",
      selectedPledgeTitle: "Enter your pledge",
      successMessage:
        "Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed.",
    },
  },
];

export const thankYouModal = {
  h1: "Thanks for your support!",
  bodyCopy:
    "Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed.",
  buttonCopy: "Got it!",
};
