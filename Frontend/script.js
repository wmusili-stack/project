// Skills Roadmap Generator - Main JavaScript File
// Light Academia theme with cozy, thoughtful interactions

// ==================== MOCK DATA STRUCTURE ====================

const skillsDatabase = {
  // TECHNOLOGY SKILLS
  'web development': {
    category: 'Technology',
    icon: '💻',
    description: 'Build beautiful websites and web applications',
    steps: [
      {
        title: 'HTML & CSS Foundations',
        description: 'Learn the building blocks of web pages',
        timeframe: '2-3 weeks',
        resources: ['FreeCodeCamp HTML/CSS', 'MDN Web Docs', 'CSS Tricks']
      },
      {
        title: 'JavaScript Fundamentals',
        description: 'Add interactivity and dynamic behavior',
        timeframe: '1-2 months',
        resources: ['JavaScript.info', 'Eloquent JavaScript', 'Mozilla JS Guide']
      },
      {
        title: 'Modern Frontend Framework',
        description: 'Master React, Vue, or similar framework',
        timeframe: '2-3 months',
        resources: ['Official React Docs', 'Vue.js Guide', 'Frontend Masters']
      },
      {
        title: 'Backend & Full-Stack',
        description: 'Learn server-side development and databases',
        timeframe: '2-4 months',
        resources: ['Node.js Docs', 'Express.js', 'MongoDB University']
      }
    ]
  },

  'data science': {
    category: 'Technology',
    icon: '📊',
    description: 'Analyze data to discover insights and patterns',
    steps: [
      {
        title: 'Statistics & Excel Mastery',
        description: 'Build foundation in data analysis',
        timeframe: '3-4 weeks',
        resources: ['Khan Academy Statistics', 'Excel Exposure', 'Coursera Statistics']
      },
      {
        title: 'Python Programming',
        description: 'Learn Python for data manipulation',
        timeframe: '1-2 months',
        resources: ['Python.org Tutorial', 'Automate the Boring Stuff', 'Codecademy Python']
      },
      {
        title: 'Data Analysis Libraries',
        description: 'Master Pandas, NumPy, and Matplotlib',
        timeframe: '2-3 months',
        resources: ['Pandas Documentation', 'NumPy Tutorials', 'Matplotlib Gallery']
      },
      {
        title: 'Machine Learning',
        description: 'Build predictive models and AI systems',
        timeframe: '3-6 months',
        resources: ['Scikit-learn Docs', 'Coursera ML Course', 'Kaggle Learn']
      }
    ]
  },

  // CREATIVE SKILLS
  'graphic design': {
    category: 'Creative',
    icon: '🎨',
    description: 'Create visual communications that inspire',
    steps: [
      {
        title: 'Design Principles & Theory',
        description: 'Learn color, typography, and composition',
        timeframe: '2-3 weeks',
        resources: ['Design Elements Book', 'Adobe Design Principles', 'Canva Design School']
      },
      {
        title: 'Adobe Creative Suite',
        description: 'Master Photoshop, Illustrator, and InDesign',
        timeframe: '2-3 months',
        resources: ['Adobe Tutorials', 'Skillshare Classes', 'YouTube Channels']
      },
      {
        title: 'Portfolio Development',
        description: 'Build a stunning showcase of your work',
        timeframe: '1-2 months',
        resources: ['Behance', 'Dribbble', 'Personal Website Builders']
      },
      {
        title: 'Client Work & Specialization',
        description: 'Find your niche and start professional work',
        timeframe: '3-6 months',
        resources: ['Freelance Platforms', 'Design Communities', 'Business Courses']
      }
    ]
  },

  'photography': {
    category: 'Creative',
    icon: '📸',
    description: 'Capture and create compelling visual stories',
    steps: [
      {
        title: 'Camera Basics & Composition',
        description: 'Understand exposure, framing, and visual storytelling',
        timeframe: '2-4 weeks',
        resources: ['Photography Basics Course', 'Rule of Thirds Guide', 'Camera Manual']
      },
      {
        title: 'Technical Mastery',
        description: 'Master manual mode, lighting, and advanced techniques',
        timeframe: '2-3 months',
        resources: ['Photography Forums', 'YouTube Tutorials', 'Local Photography Groups']
      },
      {
        title: 'Post-Processing Skills',
        description: 'Learn Lightroom and Photoshop for editing',
        timeframe: '1-2 months',
        resources: ['Adobe Lightroom Tutorials', 'Photo Editing Courses', 'Preset Collections']
      },
      {
        title: 'Portfolio & Specialization',
        description: 'Develop your style and build professional presence',
        timeframe: '3-6 months',
        resources: ['Instagram for Photographers', 'Photography Websites', 'Local Exhibitions']
      }
    ]
  },

  // BUSINESS SKILLS
  'digital marketing': {
    category: 'Business',
    icon: '📱',
    description: 'Grow businesses through online channels',
    steps: [
      {
        title: 'Social Media Foundations',
        description: 'Master content creation and platform strategies',
        timeframe: '2-3 weeks',
        resources: ['Platform Creator Guides', 'Content Planning Tools', 'Analytics Basics']
      },
      {
        title: 'SEO & Content Marketing',
        description: 'Drive organic traffic through valuable content',
        timeframe: '1-2 months',
        resources: ['Google SEO Guide', 'Content Marketing Institute', 'Keyword Research Tools']
      },
      {
        title: 'Paid Advertising',
        description: 'Master Google Ads, Facebook Ads, and PPC',
        timeframe: '2-3 months',
        resources: ['Google Ads Certification', 'Facebook Blueprint', 'PPC Courses']
      },
      {
        title: 'Analytics & Optimization',
        description: 'Measure success and optimize campaigns',
        timeframe: '1-2 months',
        resources: ['Google Analytics Academy', 'Conversion Rate Optimization', 'A/B Testing Tools']
      }
    ]
  },

  // LIFESTYLE SKILLS
  'cooking': {
    category: 'Lifestyle',
    icon: '🍳',
    description: 'Create delicious, nourishing meals with confidence',
    steps: [
      {
        title: 'Knife Skills & Basic Techniques',
        description: 'Master fundamental cooking methods and safety',
        timeframe: '2-3 weeks',
        resources: ['Basic Knife Skills Videos', 'Cooking Technique Books', 'Practice Recipes']
      },
      {
        title: 'Flavor Building & Seasoning',
        description: 'Understand how to build complex, delicious flavors',
        timeframe: '1-2 months',
        resources: ['Salt Fat Acid Heat', 'Spice Guides', 'Flavor Pairing Charts']
      },
      {
        title: 'Cuisine Exploration',
        description: 'Dive deep into different cooking traditions',
        timeframe: '2-4 months',
        resources: ['Cookbook Collections', 'Cultural Cooking Classes', 'Online Tutorials']
      },
      {
        title: 'Advanced Techniques',
        description: 'Master professional methods and presentation',
        timeframe: '3-6 months',
        resources: ['Advanced Cookbooks', 'Culinary Courses', 'Food Photography']
      }
    ]
  },

  'fitness': {
    category: 'Health & Wellness',
    icon: '💪',
    description: 'Build strength, endurance, and overall wellness',
    steps: [
      {
        title: 'Movement Foundations',
        description: 'Learn proper form and basic exercises',
        timeframe: '2-4 weeks',
        resources: ['Bodyweight Training Apps', 'Form Check Videos', 'Beginner Programs']
      },
      {
        title: 'Strength Training',
        description: 'Build muscle and functional strength',
        timeframe: '2-3 months',
        resources: ['Starting Strength', 'Fitness Apps', 'Local Gym Classes']
      },
      {
        title: 'Nutrition Integration',
        description: 'Fuel your body for optimal performance',
        timeframe: '1-2 months',
        resources: ['Nutrition Basics Course', 'Meal Planning Apps', 'Macro Tracking']
      },
      {
        title: 'Advanced Programming',
        description: 'Periodization, specialization, and long-term goals',
        timeframe: '3-6 months',
        resources: ['Advanced Programs', 'Personal Trainer Certification', 'Sport-Specific Training']
      }
    ]
  }
};

// Interest-to-Skills Mapping
const interestMappings = {
  'art': ['graphic design', 'photography'],
  'technology': ['web development', 'data science'],
  'creativity': ['graphic design', 'photography'],
  'problem-solving': ['web development', 'data science'],
  'business': ['digital marketing'],
  'marketing': ['digital marketing'],
  'health': ['fitness', 'cooking'],
  'wellness': ['fitness', 'cooking'],
  'food': ['cooking'],
  'exercise': ['fitness'],
  'design': ['graphic design'],
  'visual': ['graphic design', 'photography'],
  'analytics': ['data science', 'digital marketing'],
  'social media': ['digital marketing'],
  'lifestyle': ['cooking', 'fitness']
};

// ==================== LOCALSTORAGE FUNCTIONS ====================

// Save roadmap to localStorage
function saveRoadmap(skillKey, roadmapData) {
  try {
    const savedRoadmaps = JSON.parse(localStorage.getItem('skillRoadmaps') || '{}');
    savedRoadmaps[skillKey] = {
      ...roadmapData,
      savedAt: new Date().toISOString(),
      progress: roadmapData.steps.map(() => false) // Initialize all steps as incomplete
    };
    localStorage.setItem('skillRoadmaps', JSON.stringify(savedRoadmaps));
    console.log('💾 Roadmap saved successfully');
  } catch (error) {
    console.error('Failed to save roadmap:', error);
  }
}

// Load saved roadmap
function loadRoadmap(skillKey) {
  try {
    const savedRoadmaps = JSON.parse(localStorage.getItem('skillRoadmaps') || '{}');
    return savedRoadmaps[skillKey] || null;
  } catch (error) {
    console.error('Failed to load roadmap:', error);
    return null;
  }
}

// Update step completion
function updateStepCompletion(skillKey, stepIndex, completed) {
  try {
    const savedRoadmaps = JSON.parse(localStorage.getItem('skillRoadmaps') || '{}');
    if (savedRoadmaps[skillKey]) {
      savedRoadmaps[skillKey].progress[stepIndex] = completed;
      savedRoadmaps[skillKey].lastUpdated = new Date().toISOString();
      localStorage.setItem('skillRoadmaps', JSON.stringify(savedRoadmaps));
      
      // Update progress display
      updateProgressDisplay(skillKey);
      console.log(`✅ Step ${stepIndex + 1} marked as ${completed ? 'complete' : 'incomplete'}`);
    }
  } catch (error) {
    console.error('Failed to update step completion:', error);
  }
}

// Calculate completion percentage
function calculateProgress(skillKey) {
  const savedRoadmap = loadRoadmap(skillKey);
  if (!savedRoadmap || !savedRoadmap.progress) return 0;
  
  const completed = savedRoadmap.progress.filter(step => step).length;
  const total = savedRoadmap.progress.length;
  return Math.round((completed / total) * 100);
}

// Update progress display in the UI
function updateProgressDisplay(skillKey) {
  const progressBar = document.querySelector('.progress-bar-fill');
  const progressText = document.querySelector('.progress-text');
  
  if (progressBar && progressText) {
    const percentage = calculateProgress(skillKey);
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}% Complete`;
    
    // Add encouraging message based on progress
    const encouragementEl = document.querySelector('.progress-encouragement');
    if (encouragementEl) {
      let message = '';
      if (percentage === 0) message = 'Your learning journey begins! 🌱';
      else if (percentage < 25) message = 'Great start! Keep going! 🌿';
      else if (percentage < 50) message = 'You\'re making excellent progress! 📚';
      else if (percentage < 75) message = 'More than halfway there! 🌟';
      else if (percentage < 100) message = 'Almost there! You\'ve got this! 🚀';
      else message = 'Congratulations! Roadmap completed! 🎉';
      
      encouragementEl.textContent = message;
    }
  }
}

// Get all saved roadmaps
function getAllSavedRoadmaps() {
  try {
    return JSON.parse(localStorage.getItem('skillRoadmaps') || '{}');
  } catch (error) {
    console.error('Failed to load saved roadmaps:', error);
    return {};
  }
}

// ==================== ENHANCED FEATURES ====================

// Store current roadmap data for export
let currentRoadmapData = null;

// Export current roadmap (simplified approach)
function exportCurrentRoadmap() {
  if (!currentRoadmapData) {
    console.error('No roadmap data to export');
    return;
  }
  
  const { skillKey, skillData, title } = currentRoadmapData;
  const savedData = loadRoadmap(skillKey);
  const progress = savedData ? savedData.progress : [];
  const completionPercentage = calculateProgress(skillKey);
  
  // Create formatted text content
  const exportContent = `SKILLS ROADMAP GENERATOR
${title}
Generated on: ${new Date().toLocaleDateString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 ROADMAP OVERVIEW
${skillData.icon} Skill: ${title}
📚 Category: ${skillData.category}
✨ Description: ${skillData.description}
📈 Progress: ${completionPercentage}% Complete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📖 LEARNING PATH

${skillData.steps.map((step, index) => `
${progress[index] ? '✅' : '⭕'} STEP ${index + 1}: ${step.title.toUpperCase()}
   ⏱️  Timeframe: ${step.timeframe}
   📝 Description: ${step.description}
   
   📚 Resources:
${step.resources.map(resource => `   • ${resource}`).join('\n')}
   
   ${progress[index] ? '✨ STATUS: COMPLETED!' : '🌱 STATUS: Ready to start'}
`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌟 TOTAL ESTIMATED TIME: ${calculateTotalTime(skillData.steps)}

💡 TIP: Check off steps as you complete them to track your progress!
🔄 Your progress is automatically saved and will be here when you return.

Generated with ❤️ by Skills Roadmap Generator
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
  
  // Create and trigger download
  const blob = new Blob([exportContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '_').toLowerCase()}_roadmap.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  // Show success feedback
  showExportSuccess();
  console.log('📥 Roadmap exported successfully!');
}

// Calculate total time for roadmap
function calculateTotalTime(steps) {
  // Extract numeric values and convert to weeks for estimation
  let totalWeeks = 0;
  
  steps.forEach(step => {
    const timeframe = step.timeframe.toLowerCase();
    if (timeframe.includes('week')) {
      const weeks = parseInt(timeframe.match(/\d+/)[0]);
      totalWeeks += weeks;
    } else if (timeframe.includes('month')) {
      const months = parseInt(timeframe.match(/\d+/)[0]);
      totalWeeks += months * 4; // Approximate weeks per month
    }
  });
  
  if (totalWeeks < 4) {
    return `${totalWeeks} weeks`;
  } else {
    const months = Math.round(totalWeeks / 4);
    return `${months} months`;
  }
}

// Show export success message
function showExportSuccess() {
  const successMessage = document.createElement('div');
  successMessage.className = 'export-success';
  successMessage.innerHTML = `
    <span class="success-icon">📥</span>
    <span class="success-text">Roadmap exported successfully!</span>
  `;
  
  document.body.appendChild(successMessage);
  
  setTimeout(() => {
    successMessage.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    successMessage.classList.remove('show');
    setTimeout(() => successMessage.remove(), 300);
  }, 3000);
}

// Toggle step details (expand/collapse)
function toggleStepDetails(stepElement) {
  const details = stepElement.querySelector('.step-resources');
  const isExpanded = stepElement.classList.contains('expanded');
  
  if (isExpanded) {
    stepElement.classList.remove('expanded');
    details.style.maxHeight = '0';
  } else {
    stepElement.classList.add('expanded');
    details.style.maxHeight = details.scrollHeight + 'px';
  }
}

// Add difficulty level to each step
function getDifficultyLevel(stepIndex, totalSteps) {
  const percentage = (stepIndex + 1) / totalSteps;
  if (percentage <= 0.33) return { level: 'Beginner', color: 'var(--sage-green)' };
  if (percentage <= 0.66) return { level: 'Intermediate', color: 'var(--terracotta)' };
  return { level: 'Advanced', color: 'var(--dusty-blue)' };
}

// Enhanced skill matching with more categories
const enhancedSkillsDatabase = {
  ...skillsDatabase,
  
  // Additional skills we can add
  'ui design': {
    category: 'Creative',
    icon: '🎨',
    description: 'Create beautiful, user-friendly digital interfaces',
    steps: [
      {
        title: 'Design Fundamentals',
        description: 'Learn color theory, typography, and visual hierarchy',
        timeframe: '2-3 weeks',
        resources: ['Design Basics Course', 'Adobe Color Tool', 'Typography Guide']
      },
      {
        title: 'Design Tools Mastery',
        description: 'Master Figma, Sketch, or Adobe XD',
        timeframe: '1-2 months',
        resources: ['Figma Academy', 'Design Tool Tutorials', 'UI Kit Libraries']
      },
      {
        title: 'User Experience Principles',
        description: 'Understand user psychology and interaction design',
        timeframe: '2-3 months',
        resources: ['UX Courses', 'User Research Methods', 'Usability Testing']
      },
      {
        title: 'Portfolio & Professional Practice',
        description: 'Build stunning portfolio and land design work',
        timeframe: '2-4 months',
        resources: ['Portfolio Sites', 'Design Communities', 'Freelance Platforms']
      }
    ]
  },

  'content writing': {
    category: 'Creative',
    icon: '✍️',
    description: 'Craft compelling content that engages and converts',
    steps: [
      {
        title: 'Writing Fundamentals',
        description: 'Master grammar, style, and clear communication',
        timeframe: '2-4 weeks',
        resources: ['Writing Style Guides', 'Grammar Resources', 'Writing Communities']
      },
      {
        title: 'Content Strategy',
        description: 'Learn to write for specific audiences and goals',
        timeframe: '1-2 months',
        resources: ['Content Marketing Courses', 'Copywriting Books', 'Industry Blogs']
      },
      {
        title: 'Specialized Writing',
        description: 'Develop expertise in your chosen writing niche',
        timeframe: '2-3 months',
        resources: ['Niche-Specific Courses', 'Client Work Platforms', 'Writing Workshops']
      },
      {
        title: 'Business & Marketing',
        description: 'Build your writing business and find clients',
        timeframe: '1-3 months',
        resources: ['Freelance Platforms', 'Portfolio Building', 'Client Management Tools']
      }
    ]
  }
};

// Update the main skills database
Object.assign(skillsDatabase, enhancedSkillsDatabase);

// DOM Elements
const form = document.getElementById('roadmap-form');
const knownSkillInput = document.getElementById('known-skill-input');
const interest1Input = document.getElementById('interest-1-input');
const interest2Input = document.getElementById('interest-2-input');
const generateBtn = document.getElementById('generate-btn');
const outputArea = document.getElementById('roadmap-output');

// Initialize the application
function initializeApp() {
  console.log('🌿 Skills Roadmap Generator initialized...');
  
  // Add event listeners
  form.addEventListener('submit', handleFormSubmission);
  
  // Add input validation listeners
  knownSkillInput.addEventListener('input', handleInputChange);
  interest1Input.addEventListener('input', handleInputChange);
  interest2Input.addEventListener('input', handleInputChange);
  
  console.log('✨ Event listeners attached successfully');
}

// Handle form submission
function handleFormSubmission(event) {
  event.preventDefault();
  console.log('🚀 Generating roadmap...');
  
  // Get input values
  const knownSkill = knownSkillInput.value.trim().toLowerCase();
  const interest1 = interest1Input.value.trim().toLowerCase();
  const interest2 = interest2Input.value.trim().toLowerCase();
  
  // Validate inputs
  if (!knownSkill && (!interest1 || !interest2)) {
    showValidationMessage('Please fill in either a known skill OR both interests');
    return;
  }
  
  // Show loading state
  showLoadingState();
  
  // Generate roadmap after short delay for better UX
  setTimeout(() => {
    if (knownSkill) {
      generateRoadmapFromSkill(knownSkill);
    } else {
      generateRoadmapFromInterests(interest1, interest2);
    }
  }, 800);
}

// Handle input changes for real-time validation
function handleInputChange() {
  clearValidationMessage();
  
  const knownSkill = knownSkillInput.value.trim();
  const interest1 = interest1Input.value.trim();
  const interest2 = interest2Input.value.trim();
  
  // Enable/disable inputs based on what user is filling
  if (knownSkill) {
    interest1Input.style.opacity = '0.5';
    interest2Input.style.opacity = '0.5';
  } else if (interest1 || interest2) {
    knownSkillInput.style.opacity = '0.5';
  } else {
    // Reset all to normal
    knownSkillInput.style.opacity = '1';
    interest1Input.style.opacity = '1';
    interest2Input.style.opacity = '1';
  }
}

// Generate roadmap from known skill
function generateRoadmapFromSkill(skillName) {
  const skill = skillsDatabase[skillName];
  
  if (skill) {
    displayRoadmap(skill, `Advancing Your ${capitalize(skillName)} Skills`);
  } else {
    displayNoMatchMessage(skillName);
  }
}

// Generate roadmap from interests
function generateRoadmapFromInterests(interest1, interest2) {
  const matchingSkills = findSkillsFromInterests(interest1, interest2);
  
  if (matchingSkills.length > 0) {
    // Pick the first matching skill for now
    const selectedSkill = skillsDatabase[matchingSkills[0]];
    displayRoadmap(selectedSkill, `Perfect Match: ${capitalize(matchingSkills[0])}`);
  } else {
    displayInterestNoMatchMessage(interest1, interest2);
  }
}

// Find skills based on interests
function findSkillsFromInterests(interest1, interest2) {
  const matches = new Set();
  
  // Check both interests against our mapping
  [interest1, interest2].forEach(interest => {
    if (interestMappings[interest]) {
      interestMappings[interest].forEach(skill => matches.add(skill));
    }
  });
  
  return Array.from(matches);
}

// Display the generated roadmap with enhanced features
function displayRoadmap(skill, title) {
  const skillKey = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Save the roadmap with title
  const skillDataWithTitle = { ...skill, title: title };
  saveRoadmap(skillKey, skillDataWithTitle);
  
  // Load any existing progress
  const savedData = loadRoadmap(skillKey);
  const progress = savedData ? savedData.progress : skill.steps.map(() => false);
  const completionPercentage = calculateProgress(skillKey);
  const totalTime = calculateTotalTime(skill.steps);
  
  const roadmapHTML = `
    <div class="roadmap-container">
      <div class="roadmap-header">
        <span class="roadmap-icon">${skill.icon}</span>
        <h2 class="roadmap-title">${title}</h2>
        <p class="roadmap-description">${skill.description}</p>
        <div class="roadmap-meta">
          <span class="roadmap-category">${skill.category}</span>
          <span class="roadmap-duration">⏱️ ${totalTime} total</span>
        </div>
        
        <!-- Progress Tracking -->
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width: ${completionPercentage}%"></div>
          </div>
          <div class="progress-info">
            <span class="progress-text">${completionPercentage}% Complete</span>
            <span class="progress-encouragement">${getEncouragementMessage(completionPercentage)}</span>
          </div>
        </div>
      </div>
      
      <div class="roadmap-actions">
        <button class="action-button export-btn" onclick="exportCurrentRoadmap()">
          <span class="action-icon">📥</span>
          Export Roadmap
        </button>
        <button class="action-button collapse-btn" onclick="toggleAllSteps()">
          <span class="action-icon">📋</span>
          Collapse All
        </button>
      </div>
      
      <div class="roadmap-steps">
        ${skill.steps.map((step, index) => {
          const difficulty = getDifficultyLevel(index, skill.steps.length);
          return `
            <div class="roadmap-step ${progress[index] ? 'completed' : ''}" data-step="${index + 1}" data-skill="${skillKey}">
              <div class="step-header" onclick="toggleStepDetails(this.parentElement)">
                <div class="step-checkbox-container">
                  <input 
                    type="checkbox" 
                    id="step-${skillKey}-${index}" 
                    class="step-checkbox"
                    ${progress[index] ? 'checked' : ''}
                    onchange="handleStepToggle('${skillKey}', ${index}, this.checked)"
                    onclick="event.stopPropagation()"
                  >
                  <label for="step-${skillKey}-${index}" class="step-checkbox-label" onclick="event.stopPropagation()">
                    <span class="step-number">${index + 1}</span>
                  </label>
                </div>
                <div class="step-content">
                  <h3 class="step-title">${step.title}</h3>
                  <div class="step-badges">
                    <span class="difficulty-badge" style="background: ${difficulty.color}">${difficulty.level}</span>
                    <span class="step-timeframe">${step.timeframe}</span>
                  </div>
                </div>
                <span class="expand-icon">▼</span>
              </div>
              
              <div class="step-details">
                <p class="step-description">${step.description}</p>
                <div class="step-resources">
                  <h4 class="resources-title">📚 Recommended Resources:</h4>
                  <ul class="resources-list">
                    ${step.resources.map(resource => `<li>${resource}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      
      <div class="roadmap-footer">
        <button class="secondary-button" onclick="resetForm()">
          ← Generate Another Roadmap
        </button>
        <button class="secondary-button" onclick="showSavedRoadmaps()">
          📚 View Saved Roadmaps
        </button>
      </div>
    </div>
  `;
  
  outputArea.innerHTML = roadmapHTML;
  outputArea.scrollIntoView({ behavior: 'smooth' });
  hideLoadingState();
  
  // Initialize all steps as expanded by default
  setTimeout(() => {
    document.querySelectorAll('.roadmap-step').forEach(step => {
      step.classList.add('expanded');
    });
  }, 100);
}

// Toggle individual step details
function toggleStepDetails(stepElement) {
  const isExpanded = stepElement.classList.contains('expanded');
  const expandIcon = stepElement.querySelector('.expand-icon');
  const details = stepElement.querySelector('.step-details');
  
  if (isExpanded) {
    stepElement.classList.remove('expanded');
    expandIcon.textContent = '▶';
    details.style.maxHeight = '0';
    details.style.opacity = '0';
  } else {
    stepElement.classList.add('expanded');
    expandIcon.textContent = '▼';
    details.style.maxHeight = details.scrollHeight + 'px';
    details.style.opacity = '1';
  }
}

// Toggle all steps at once
function toggleAllSteps() {
  const steps = document.querySelectorAll('.roadmap-step');
  const collapseBtn = document.querySelector('.collapse-btn');
  const allExpanded = Array.from(steps).every(step => step.classList.contains('expanded'));
  
  steps.forEach(step => {
    const expandIcon = step.querySelector('.expand-icon');
    const details = step.querySelector('.step-details');
    
    if (allExpanded) {
      // Collapse all
      step.classList.remove('expanded');
      expandIcon.textContent = '▶';
      details.style.maxHeight = '0';
      details.style.opacity = '0';
    } else {
      // Expand all
      step.classList.add('expanded');
      expandIcon.textContent = '▼';
      details.style.maxHeight = details.scrollHeight + 'px';
      details.style.opacity = '1';
    }
  });
  
  // Update button text
  const icon = collapseBtn.querySelector('.action-icon');
  const text = collapseBtn.childNodes[2]; // Text node after icon span
  if (allExpanded) {
    icon.textContent = '📋';
    collapseBtn.innerHTML = '<span class="action-icon">📋</span> Collapse All';
  } else {
    icon.textContent = '📖';
    collapseBtn.innerHTML = '<span class="action-icon">📖</span> Expand All';
  }
}

// Handle step completion toggle
function handleStepToggle(skillKey, stepIndex, completed) {
  updateStepCompletion(skillKey, stepIndex, completed);
  
  // Add visual feedback
  const stepElement = document.querySelector(`[data-step="${stepIndex + 1}"]`);
  if (stepElement) {
    if (completed) {
      stepElement.classList.add('completed');
      // Add little celebration
      showStepCompletionFeedback(stepElement);
    } else {
      stepElement.classList.remove('completed');
    }
  }
}

// Show encouraging feedback when step completed
function showStepCompletionFeedback(stepElement) {
  const celebration = document.createElement('div');
  celebration.className = 'step-celebration';
  celebration.innerHTML = '✨ Well done!';
  stepElement.appendChild(celebration);
  
  setTimeout(() => {
    if (celebration.parentNode) {
      celebration.remove();
    }
  }, 2000);
}

// Get encouragement message based on progress
function getEncouragementMessage(percentage) {
  if (percentage === 0) return 'Your learning journey begins! 🌱';
  if (percentage < 25) return 'Great start! Keep going! 🌿';
  if (percentage < 50) return 'You\'re making excellent progress! 📚';
  if (percentage < 75) return 'More than halfway there! 🌟';
  if (percentage < 100) return 'Almost there! You\'ve got this! 🚀';
  return 'Congratulations! Roadmap completed! 🎉';
}

// Show all saved roadmaps
function showSavedRoadmaps() {
  const savedRoadmaps = getAllSavedRoadmaps();
  const roadmapKeys = Object.keys(savedRoadmaps);
  
  if (roadmapKeys.length === 0) {
    outputArea.innerHTML = `
      <div class="no-match-container">
        <div class="no-match-icon">📚</div>
        <h3 class="no-match-title">No Saved Roadmaps Yet</h3>
        <p class="no-match-text">
          Generate your first roadmap and start your learning journey!
        </p>
        <button class="secondary-button" onclick="resetForm()">
          ← Create Your First Roadmap
        </button>
      </div>
    `;
    return;
  }
  
  const savedRoadmapsHTML = `
    <div class="saved-roadmaps-container">
      <div class="saved-roadmaps-header">
        <h2 class="saved-roadmaps-title">📚 Your Learning Journey</h2>
        <p class="saved-roadmaps-description">Continue where you left off</p>
      </div>
      
      <div class="saved-roadmaps-grid">
        ${roadmapKeys.map(key => {
          const roadmap = savedRoadmaps[key];
          const progress = calculateProgress(key);
          const lastUpdated = new Date(roadmap.lastUpdated || roadmap.savedAt).toLocaleDateString();
          
          return `
            <div class="saved-roadmap-card" onclick="loadSavedRoadmap('${key}')">
              <div class="saved-roadmap-icon">${roadmap.icon}</div>
              <h3 class="saved-roadmap-title">${roadmap.title || key}</h3>
              <div class="saved-roadmap-progress">
                <div class="mini-progress-bar">
                  <div class="mini-progress-fill" style="width: ${progress}%"></div>
                </div>
                <span class="saved-roadmap-percentage">${progress}%</span>
              </div>
              <p class="saved-roadmap-date">Last updated: ${lastUpdated}</p>
            </div>
          `;
        }).join('')}
      </div>
      
      <div class="saved-roadmaps-footer">
        <button class="secondary-button" onclick="resetForm()">
          ← Generate New Roadmap
        </button>
      </div>
    </div>
  `;
  
  outputArea.innerHTML = savedRoadmapsHTML;
  outputArea.scrollIntoView({ behavior: 'smooth' });
}

// Load a specific saved roadmap
function loadSavedRoadmap(skillKey) {
  const savedData = loadRoadmap(skillKey);
  if (!savedData) return;
  
  // Find the original skill data and display with saved progress
  displayRoadmap(savedData, savedData.title || skillKey);
}

// Show loading state with cozy animation
function showLoadingState() {
  generateBtn.disabled = true;
  generateBtn.classList.add('loading');
  
  outputArea.innerHTML = `
    <div class="loading-container">
      <div class="loading-icon">🌱</div>
      <p class="loading-text">Crafting your personalized roadmap...</p>
    </div>
  `;
  
  outputArea.classList.add('pulse');
}

// Hide loading state
function hideLoadingState() {
  generateBtn.disabled = false;
  generateBtn.classList.remove('loading');
  outputArea.classList.remove('pulse');
}

// Display message when skill not found
function displayNoMatchMessage(skillName) {
  outputArea.innerHTML = `
    <div class="no-match-container">
      <div class="no-match-icon">🔍</div>
      <h3 class="no-match-title">Skill Not Found</h3>
      <p class="no-match-text">
        We don't have a roadmap for "${capitalize(skillName)}" yet, but that doesn't mean you can't learn it!
      </p>
      <p class="no-match-suggestion">
        Try searching for a related skill, or use the interests method to discover similar learning paths.
      </p>
      <button class="secondary-button" onclick="resetForm()">
        ← Try Again
      </button>
    </div>
  `;
  hideLoadingState();
}

// Display message when interests don't match
function displayInterestNoMatchMessage(interest1, interest2) {
  outputArea.innerHTML = `
    <div class="no-match-container">
      <div class="no-match-icon">💡</div>
      <h3 class="no-match-title">Interesting Combination!</h3>
      <p class="no-match-text">
        "${capitalize(interest1)}" and "${capitalize(interest2)}" is a unique combination! 
        We're still building roadmaps for this interest pairing.
      </p>
      <p class="no-match-suggestion">
        Try some of our available interests: art, technology, business, health, creativity, problem-solving, design, or marketing.
      </p>
      <button class="secondary-button" onclick="resetForm()">
        ← Try Different Interests
      </button>
    </div>
  `;
  hideLoadingState();
}

// Show validation message
function showValidationMessage(message) {
  // Create or update validation message
  let validationEl = document.querySelector('.validation-message');
  if (!validationEl) {
    validationEl = document.createElement('div');
    validationEl.className = 'validation-message';
    form.insertBefore(validationEl, document.querySelector('.button-container'));
  }
  
  validationEl.innerHTML = `
    <span class="validation-icon">⚠️</span>
    <span class="validation-text">${message}</span>
  `;
  validationEl.style.display = 'block';
}

// Clear validation message
function clearValidationMessage() {
  const validationEl = document.querySelector('.validation-message');
  if (validationEl) {
    validationEl.style.display = 'none';
  }
}

// Reset form to initial state
function resetForm() {
  form.reset();
  outputArea.innerHTML = '';
  clearValidationMessage();
  
  // Reset input opacity
  knownSkillInput.style.opacity = '1';
  interest1Input.style.opacity = '1';
  interest2Input.style.opacity = '1';
  
  // Focus first input
  knownSkillInput.focus();
}

// Utility function to capitalize strings
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ==================== PERFORMANCE & UX ENHANCEMENTS ====================

// Debounce function for better performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Enhanced input handling with debouncing
const debouncedInputChange = debounce(handleInputChange, 300);

// Add input autocomplete suggestions
const skillSuggestions = Object.keys(skillsDatabase);
const interestSuggestions = Object.keys(interestMappings);

function addInputEnhancements() {
  // Add autocomplete datalists
  if (!document.getElementById('skill-suggestions')) {
    const skillDatalist = document.createElement('datalist');
    skillDatalist.id = 'skill-suggestions';
    skillDatalist.innerHTML = skillSuggestions.map(skill => 
      `<option value="${skill}">${capitalize(skill)}</option>`
    ).join('');
    document.body.appendChild(skillDatalist);
    
    knownSkillInput.setAttribute('list', 'skill-suggestions');
  }
  
  if (!document.getElementById('interest-suggestions')) {
    const interestDatalist = document.createElement('datalist');
    interestDatalist.id = 'interest-suggestions';
    interestDatalist.innerHTML = interestSuggestions.map(interest => 
      `<option value="${interest}">${capitalize(interest)}</option>`
    ).join('');
    document.body.appendChild(interestDatalist);
    
    interest1Input.setAttribute('list', 'interest-suggestions');
    interest2Input.setAttribute('list', 'interest-suggestions');
  }
}

// Enhanced step completion with smooth animations
function handleStepToggle(skillKey, stepIndex, completed) {
  updateStepCompletion(skillKey, stepIndex, completed);
  
  // Add visual feedback with enhanced animation
  const stepElement = document.querySelector(`[data-step="${stepIndex + 1}"]`);
  if (stepElement) {
    if (completed) {
      stepElement.classList.add('completed');
      // Enhanced celebration with particle effect
      showEnhancedStepCompletion(stepElement);
      // Update progress with smooth animation
      setTimeout(() => updateProgressDisplay(skillKey), 300);
    } else {
      stepElement.classList.remove('completed');
      updateProgressDisplay(skillKey);
    }
  }
}

// Enhanced step completion feedback
function showEnhancedStepCompletion(stepElement) {
  const celebration = document.createElement('div');
  celebration.className = 'step-celebration';
  celebration.innerHTML = '✨ Well done!';
  stepElement.appendChild(celebration);
  
  // Add multiple particle effects
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      createCelebrationParticle(stepElement);
    }, i * 200);
  }
  
  setTimeout(() => {
    if (celebration.parentNode) {
      celebration.remove();
    }
  }, 2500);
}

// Create celebration particles
function createCelebrationParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'celebration-particle';
  particle.textContent = ['🌟', '✨', '🎉', '💫'][Math.floor(Math.random() * 4)];
  
  particle.style.cssText = `
    position: absolute;
    top: ${Math.random() * 50}%;
    right: ${Math.random() * 100}px;
    font-size: ${0.8 + Math.random() * 0.4}rem;
    pointer-events: none;
    z-index: 20;
    animation: particleFloat 2s ease-out forwards;
  `;
  
  container.appendChild(particle);
  
  setTimeout(() => {
    if (particle.parentNode) {
      particle.remove();
    }
  }, 2000);
}

// Add keyboard shortcuts
function addKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to generate roadmap
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!generateBtn.disabled) {
        form.dispatchEvent(new Event('submit'));
      }
    }
    
    // Escape to reset form
    if (e.key === 'Escape') {
      resetForm();
    }
    
    // Ctrl/Cmd + S to export (if roadmap is displayed)
    if ((e.ctrlKey || e.metaKey) && e.key === 's' && currentRoadmapData) {
      e.preventDefault();
      exportCurrentRoadmap();
    }
  });
}

// Enhanced form validation with better UX
function validateInputs() {
  const knownSkill = knownSkillInput.value.trim();
  const interest1 = interest1Input.value.trim();
  const interest2 = interest2Input.value.trim();
  
  // Clear previous validation
  clearValidationMessage();
  
  // Check if user filled both sections
  if (knownSkill && (interest1 || interest2)) {
    showValidationMessage('Please use either the skill input OR the interests inputs, not both');
    return false;
  }
  
  // Check if nothing is filled
  if (!knownSkill && !interest1 && !interest2) {
    showValidationMessage('Please fill in either a known skill OR both interests');
    return false;
  }
  
  // Check if only one interest is filled
  if (!knownSkill && (interest1 && !interest2) || (!interest1 && interest2)) {
    showValidationMessage('Please fill in both interest fields to get the best skill suggestions');
    return false;
  }
  
  return true;
}

// Initialize the application with enhancements
function initializeApp() {
  console.log('🌿 Skills Roadmap Generator initialized...');
  
  // Add event listeners
  form.addEventListener('submit', handleFormSubmissionWithValidation);
  
  // Add enhanced input validation listeners with debouncing
  knownSkillInput.addEventListener('input', debouncedInputChange);
  interest1Input.addEventListener('input', debouncedInputChange);
  interest2Input.addEventListener('input', debouncedInputChange);
  
  // Add input enhancements
  addInputEnhancements();
  
  // Add keyboard shortcuts
  addKeyboardShortcuts();
  
  // Add performance optimizations
  addPerformanceOptimizations();
  
  console.log('✨ Enhanced features loaded successfully');
}

// Enhanced form submission with validation
function handleFormSubmissionWithValidation(event) {
  event.preventDefault();
  
  // Validate inputs first
  if (!validateInputs()) {
    return;
  }
  
  console.log('🚀 Generating roadmap...');
  
  // Get input values
  const knownSkill = knownSkillInput.value.trim().toLowerCase();
  const interest1 = interest1Input.value.trim().toLowerCase();
  const interest2 = interest2Input.value.trim().toLowerCase();
  
  // Show loading state
  showLoadingState();
  
  // Generate roadmap after short delay for better UX
  setTimeout(() => {
    if (knownSkill) {
      generateRoadmapFromSkill(knownSkill);
    } else {
      generateRoadmapFromInterests(interest1, interest2);
    }
  }, 800);
}

// Add performance optimizations
function addPerformanceOptimizations() {
  // Optimize scroll performance
  let ticking = false;
  
  function updateScrollEffects() {
    // Add subtle parallax or scroll effects if needed
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  });
  
  // Preload critical resources
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'font';
  link.type = 'font/woff2';
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

// Enhanced reset with smooth transitions
function resetForm() {
  // Smooth transition out
  if (outputArea.innerHTML) {
    outputArea.style.opacity = '0';
    outputArea.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      outputArea.innerHTML = '';
      outputArea.style.opacity = '1';
      outputArea.style.transform = 'translateY(0)';
    }, 300);
  }
  
  form.reset();
  clearValidationMessage();
  currentRoadmapData = null;
  
  // Reset input opacity with smooth transition
  [knownSkillInput, interest1Input, interest2Input].forEach(input => {
    input.style.transition = 'opacity 0.3s ease';
    input.style.opacity = '1';
  });
  
  // Focus first input with slight delay
  setTimeout(() => {
    knownSkillInput.focus();
  }, 400);
}

// ==================== INITIALIZATION ====================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Add some delightful console messages
console.log('%c🌿 Skills Roadmap Generator', 'color: #9caf88; font-size: 16px; font-weight: bold;');
console.log('%c✨ Light academia vibes activated', 'color: #8b7355; font-style: italic;');