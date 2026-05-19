// Simple rule-based AI controller for complaint analysis
exports.analyzeComplaint = (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!description || !title) {
      return res.status(400).json({ message: 'Title and description are required for analysis.' });
    }

    const textToAnalyze = `${title} ${description}`.toLowerCase();
    
    // Default values
    let urgency = 'Low';
    let department = 'General Services';
    let summary = `This is a complaint regarding ${category || 'general issues'}.`;
    
    // Rule definitions
    const urgencyKeywords = {
      High: ['leakage', 'fire', 'emergency', 'danger', 'broken pipe', 'accident', 'immediate'],
      Medium: ['garbage', 'pothole', 'street light', 'noise', 'maintenance'],
    };

    const departmentKeywords = {
      'Water Department': ['water', 'leakage', 'pipe', 'drainage', 'flood'],
      'Electricity Department': ['electricity', 'power cut', 'wire', 'street light', 'transformer'],
      'Sanitation Department': ['garbage', 'trash', 'smell', 'waste', 'cleaning', 'sewer'],
      'Roads Department': ['pothole', 'road', 'asphalt', 'traffic light'],
    };

    // Determine Urgency
    if (urgencyKeywords.High.some(keyword => textToAnalyze.includes(keyword))) {
      urgency = 'High';
    } else if (urgencyKeywords.Medium.some(keyword => textToAnalyze.includes(keyword))) {
      urgency = 'Medium';
    }

    // Determine Department
    for (const [dept, keywords] of Object.entries(departmentKeywords)) {
      if (keywords.some(keyword => textToAnalyze.includes(keyword))) {
        department = dept;
        break;
      }
    }

    // Auto Response
    let autoResponse = `Thank you for reporting. Your issue has been routed to the ${department}. `;
    if (urgency === 'High') {
      autoResponse += 'Given the high urgency, our team will look into this immediately.';
    } else {
      autoResponse += 'We will address this issue as soon as possible.';
    }

    // Generate Result
    const analysisResult = {
      urgency,
      department,
      summary,
      autoResponse
    };

    res.status(200).json(analysisResult);
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing complaint', error: error.message });
  }
};
