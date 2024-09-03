window.open = function() {
  console.log('Attempt to open a new window or tab blocked.');
  return null; // Prevents opening a new window or tab
};

// Function to simulate a click on an element
function clickElement(element) {
  const clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(clickEvent);
}

// Function to close the popup if the close button exists
function closePopup() {
  const closeButton = document.querySelector('button.absolute.rounded-sm.opacity-70.right-5.top-6.sm\\:right-9.sm\\:top-9');
  if (closeButton) {
    clickElement(closeButton);
    console.log('Popup closed.');
  }
}

// Function to check for the claim button and click it if found
function checkClaimButton() {
  const claimButton = document.querySelector('button.inline-flex.bg-primary:not([disabled]).font-bold.px-6.w-full');
  if (claimButton) {
    clickElement(claimButton);
    console.log('Claim button clicked');
    setTimeout(closePopup, 2000); // Close the popup after 2 seconds
    return true;
  }
  return false;
}

// Function to check conditions and retry the process if necessary
function checkConditionsAndRetry() {
  const elementsToWaitFor = document.querySelectorAll('.text-size-14.font-bold');
  const successIcons = document.querySelectorAll('svg[data-state="closed"] .ml-4.flex.gap-4.items-center');
  
  if (elementsToWaitFor.length > 0 || successIcons.length !== elementsToClick.length) {
    setTimeout(processElements, 60000); // Retry after 60 seconds if conditions are not met
  } else {
    checkClaimButton();
  }
}

// Function to handle clicking through all necessary elements
function processElements() {
  alert('Galxe Auto Complete tasks');
  
  // Try clicking the claim button first
  if (!checkClaimButton()) {
    // If the claim button is not found, click other elements
    elementsToClick.forEach(clickElement);
    setTimeout(() => {
      const refreshButtons = document.querySelectorAll('button[data-state="closed"] .ml-5.flex.gap-4.items-center svg');
      refreshButtons.forEach(clickElement);
      setTimeout(checkConditionsAndRetry, 2000); // Check conditions and retry after 2 seconds
    }, 2000);
  }
}

// Function to find and click all elements with the specific classes
function clickTargetElements() {
  // Selector targeting the parent span that includes specific class attributes
  const targetSelector = '[class*="text-size-16"][class*="hover:text-text-linkBase"]';

  // Find all matching elements
  const elementsToClick = document.querySelectorAll(targetSelector);

  // Loop through each element and click it
  elementsToClick.forEach(clickElement);
}

// Execute the function to click the elements with specific attributes
clickTargetElements();

// Find elements to click initially
const elementsToClick = document.querySelectorAll('div[data-state="closed"] .cursor-pointer');

// Start the main process
processElements();
