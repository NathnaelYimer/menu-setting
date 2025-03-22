document.addEventListener('DOMContentLoaded', function() {
  // Get all draggable items
  const draggableItems = document.querySelectorAll('.feature-item');
  
  // Get all dropzones
  const dropzones = document.querySelectorAll('.kanban-dropzone');
  
  // Get all "Choose" buttons
  const chooseButtons = document.querySelectorAll('.choose-button');
  
  // Variable to store the currently dragged item
  let draggedItem = null;
  let originalPlan = null;
  
  // Add event listeners to all draggable items
  draggableItems.forEach(item => {
    // Drag start event
    item.addEventListener('dragstart', function(e) {
      draggedItem = this;
      originalPlan = this.getAttribute('data-plan');
      
      // Add dragging class for visual feedback
      setTimeout(() => {
        this.classList.add('dragging');
      }, 0);
      
      // Set data transfer
      e.dataTransfer.setData('text/plain', this.getAttribute('data-id'));
    });
    
    // Drag end event
    item.addEventListener('dragend', function() {
      // Remove dragging class
      this.classList.remove('dragging');
      draggedItem = null;
      originalPlan = null;
    });
  });
  
  // Add event listeners to all dropzones
  dropzones.forEach(zone => {
    // Dragover event
    zone.addEventListener('dragover', function(e) {
      e.preventDefault();
      this.classList.add('highlight');
    });
    
    // Dragleave event
    zone.addEventListener('dragleave', function() {
      this.classList.remove('highlight');
    });
    
    // Drop event
    zone.addEventListener('drop', function(e) {
      e.preventDefault();
      this.classList.remove('highlight');
      
      if (draggedItem) {
        const targetPlan = this.getAttribute('data-plan');
        
        // Only move if dropping to a different plan
        if (originalPlan !== targetPlan) {
          // Clone the item to keep its event listeners
          const clonedItem = draggedItem.cloneNode(true);
          
          // Update the plan attribute
          clonedItem.setAttribute('data-plan', targetPlan);
          
          // Update the checkmark color
          const checkmark = clonedItem.querySelector('.feature-check');
          checkmark.className = `feature-check ${targetPlan}-check`;
          
          // Add the item to the new dropzone
          this.appendChild(clonedItem);
          
          // Remove the original item
          draggedItem.remove();
          
          // Add event listeners to the cloned item
          setupDragListeners(clonedItem);
        }
      }
    });
  });
  
  // Function to set up drag listeners for a new item
  function setupDragListeners(item) {
    item.addEventListener('dragstart', function(e) {
      draggedItem = this;
      originalPlan = this.getAttribute('data-plan');
      
      setTimeout(() => {
        this.classList.add('dragging');
      }, 0);
      
      e.dataTransfer.setData('text/plain', this.getAttribute('data-id'));
    });
    
    item.addEventListener('dragend', function() {
      this.classList.remove('dragging');
      draggedItem = null;
      originalPlan = null;
    });
  }
  
  // Add click event listeners to all "Choose" buttons
  chooseButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get the plan type based on button class
      let planType = '';
      if (this.classList.contains('platinum')) planType = 'Platinum';
      else if (this.classList.contains('gold')) planType = 'Gold';
      else if (this.classList.contains('silver')) planType = 'Silver';
      else if (this.classList.contains('bronze')) planType = 'Bronze';
      else if (this.classList.contains('iron')) planType = 'Iron';
      
      // Alert for demonstration
      alert(`You've selected the ${planType} plan.`);
    });
  });
});