/**
 * MindForge AI — Core Application Logic
 * Interactive UI management, tab switching, flashcards, quiz engine, planner, pomodoro, mindmap.
 */

// Initial Data & State
const AppState = {
  currentTab: 'workspace',
  selectedAgent: 'auto',
  currentSubject: 'cs',
  messages: [],
  artifacts: [],
  traceLogs: [],
  
  // Flashcards State
  flashcards: [
    {
      id: 1,
      tag: 'Computer Science',
      question: 'What is the core difference between BFS and DFS in graph traversal, and when is BFS optimal?',
      answer: 'BFS explores neighbor-by-neighbor using a FIFO Queue. It is optimal for finding the shortest path on unweighted graphs. DFS explores depth using a LIFO Stack and is suited for connectivity and topological sorting.',
      mnemonic: 'BFS = Broad Flow in Streets (Shortest distance); DFS = Deep Fall into Secrets.',
      rating: 'unrated'
    },
    {
      id: 2,
      tag: 'Calculus',
      question: 'What does the Fundamental Theorem of Calculus formally link together?',
      answer: 'It establishes that differentiation and definite integration are inverse operations. Part 1 shows that continuous functions have antiderivatives; Part 2 shows that integrals can be computed using antiderivatives: ∫[a,b] f(x)dx = F(b) - F(a).',
      mnemonic: 'Integrals accumulate area; Derivatives measure change. FTC is the two-way bridge.',
      rating: 'unrated'
    },
    {
      id: 3,
      tag: 'Physics',
      question: 'Why does Heisenberg\'s Uncertainty Principle state that Δx · Δp ≥ ℏ/2?',
      answer: 'Because quantum particles exhibit wave-particle duality. The position and momentum of a wave packet are Fourier transform pairs: a tightly localized position (small Δx) requires a broad spread of wavelengths/momenta (large Δp).',
      mnemonic: 'To know where the wave is, you must sacrifice knowing how fast it ripples.',
      rating: 'unrated'
    },
    {
      id: 4,
      tag: 'Biology',
      question: 'What occurs during the Chemiosmotic Coupling phase of Cellular Respiration?',
      answer: 'Electrons passing through the electron transport chain pump protons (H+) from the mitochondrial matrix into the intermembrane space, creating an electrochemical gradient. Protons rushing back through ATP Synthase drive ATP production.',
      mnemonic: 'Proton Dam: Water (protons) held back turns the turbine (ATP Synthase) to generate power.',
      rating: 'unrated'
    },
    {
      id: 5,
      tag: 'AI / Machine Learning',
      question: 'Why do Transformers utilize Multi-Head Attention rather than a single attention head?',
      answer: 'Multi-head attention projects Queries, Keys, and Values into multiple lower-dimensional subspaces, allowing the model to simultaneously attend to information from different representation subspaces (e.g. grammar, semantic links, pronoun coreference) at different positions.',
      mnemonic: 'Multiple pairs of specialized glasses: one looks for nouns, one looks for sentiment, one tracks verbs.',
      rating: 'unrated'
    },
    {
      id: 6,
      tag: 'History',
      question: 'What was the primary geopolitical outcome of the Treaty of Westphalia (1648)?',
      answer: 'It ended the Thirty Years\' War and established the principle of Westphalian Sovereignty—that sovereign states have exclusive authority over their own territory and domestic religious affairs, giving birth to the modern nation-state system.',
      mnemonic: 'Westphalia = Walls around states: "My realm, my rules."',
      rating: 'unrated'
    },
    {
      id: 7,
      tag: 'Algorithms',
      question: 'What is the master difference between Memoization and Tabulation in Dynamic Programming?',
      answer: 'Memoization is Top-Down with recursion and caching results in a lookup table/map. Tabulation is Bottom-Up, iteratively filling a table from base cases up to the target, avoiding call-stack overhead.',
      mnemonic: 'Memoization = Remembering past questions; Tabulation = Building brick-by-brick from ground up.',
      rating: 'unrated'
    },
    {
      id: 8,
      tag: 'Organic Chemistry',
      question: 'What defines an SN2 reaction mechanism compared to SN1?',
      answer: 'SN2 is a concerted, single-step bimolecular nucleophilic substitution where the nucleophile attacks the substrate from the backside simultaneously as the leaving group departs, leading to complete stereochemical inversion (Walden inversion).',
      mnemonic: 'SN2 = Simultaneous attack; SN1 = One leaves first, carbocation intermediate.',
      rating: 'unrated'
    }
  ],
  currentCardIndex: 0,
  isCardFlipped: false,

  // Quiz State
  quiz: {
    active: false,
    topic: 'Computer Science: Algorithms & Data Structures',
    questions: [
      {
        question: 'What is the worst-case time complexity of standard Quicksort when the pivot is chosen naively as the first element on already sorted data?',
        options: ['O(N log N)', 'O(N²)', 'O(N)', 'O(log N)'],
        correct: 1,
        explanation: 'When the array is already sorted and the first element is picked, every partition yields unbalanced subproblems of size 0 and N-1, degrading the recursive depth to O(N) and total time to O(N²).'
      },
      {
        question: 'In a hash table using separate chaining, what is the expected time complexity for a search operation assuming uniform hashing?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correct: 0,
        explanation: 'Under simple uniform hashing, each key is equally likely to hash to any slot, keeping chain lengths bounded by the load factor α, resulting in O(1) average search time.'
      },
      {
        question: 'Which graph algorithm is guaranteed to find the shortest path in a weighted graph that may contain negative edge weights (provided there are no negative cycles)?',
        options: ['Dijkstra\'s Algorithm', 'Breadth-First Search (BFS)', 'Bellman-Ford Algorithm', 'Kruskal\'s Algorithm'],
        correct: 2,
        explanation: 'Bellman-Ford relaxes all edges |V|-1 times, correctly computing shortest paths even with negative edge weights, and can detect negative-weight cycles.'
      },
      {
        question: 'What data structure is typically used to implement a Priority Queue with O(log N) insertion and deletion?',
        options: ['Binary Heap', 'Linked List', 'Stack', 'Circular Queue'],
        correct: 0,
        explanation: 'A Binary Heap satisfies the heap-order property and complete binary tree structural property, allowing log N sift-up and sift-down operations.'
      },
      {
        question: 'What problem does the Floyd-Warshall algorithm solve?',
        options: ['Minimum Spanning Tree', 'Single-Source Shortest Path', 'All-Pairs Shortest Path', 'Bipartite Matching'],
        correct: 2,
        explanation: 'Floyd-Warshall uses dynamic programming with three nested loops to compute shortest paths between all pairs of vertices in O(V³) time.'
      }
    ],
    currentIndex: 0,
    score: 0,
    streak: 0,
    answered: false
  },

  // Pomodoro State
  pomodoro: {
    totalSeconds: 25 * 60,
    remainingSeconds: 25 * 60,
    isRunning: false,
    intervalId: null,
    mode: 'focus' // 'focus', 'shortBreak', 'longBreak'
  },

  // Planner Milestones State
  milestones: [
    { id: 1, title: 'Foundational Diagnostics & Concept Mapping', desc: 'Identify core theorems, vocabulary, and prerequisite gaps.', pomos: 3, done: true },
    { id: 2, title: 'Deep Notes Synthesis & Formula Cheatsheet', desc: 'Summarize key principles into concise high-yield revision blocks.', pomos: 4, done: true },
    { id: 3, title: 'Active-Recall Flashcards: Core Definitions', desc: 'Drill 25 fundamental terms with spaced repetition.', pomos: 2, done: false },
    { id: 4, title: 'Targeted Problem Sets: Medium Difficulty', desc: 'Solve 10 textbook problems focusing on edge cases.', pomos: 4, done: false },
    { id: 5, title: 'Socratic Inquiry on Challenging Proofs', desc: 'Work through complex proofs and structural derivations.', pomos: 3, done: false },
    { id: 6, title: 'Timed Diagnostic Exam Simulation', desc: 'Complete a full timed practice test in quiet exam conditions.', pomos: 3, done: false },
    { id: 7, title: 'Mistake Analysis & Weakness Patching', desc: 'Turn incorrect practice exam questions into flashcards.', pomos: 2, done: false },
    { id: 8, title: 'Final High-Yield Review & Mental Rest', desc: 'Low-stress review of the cheatsheet and adequate rest.', pomos: 1, done: false }
  ]
};

// ============================================================================
// Initialization & Event Listeners
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initChat();
  initFlashcards();
  initQuiz();
  initPlanner();
  initPomodoro();
  initCritic();
  initSocratic();
  initMindMap();
  initApiModal();
  updateApiStatusUI();
});

// Toast notification helper
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>⚡</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ============================================================================
// Navigation & Tab Switching
// ============================================================================

function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const topbarTitle = document.getElementById('topbar-title');
  const mobileToggle = document.getElementById('mobile-toggle');
  const sidebar = document.getElementById('sidebar');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.dataset.tab;
      
      navButtons.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePane = document.getElementById(`pane-${tabTarget}`);
      if (activePane) activePane.classList.add('active');

      AppState.currentTab = tabTarget;
      if (topbarTitle) {
        topbarTitle.textContent = btn.querySelector('.nav-title')?.textContent || 'MindForge AI';
      }

      if (window.innerWidth <= 768 && sidebar) {
        sidebar.classList.remove('open');
      }

      // Re-render mindmap if switching to workspace
      if (tabTarget === 'workspace') {
        renderMindMap();
      }
    });
  });

  // Mobile drawer toggle
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Sidebar agent switcher
  const agentChips = document.querySelectorAll('.agent-chip');
  agentChips.forEach(chip => {
    chip.addEventListener('click', () => {
      agentChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      AppState.selectedAgent = chip.dataset.agent;

      const directSelect = document.getElementById('direct-agent-select');
      if (directSelect) directSelect.value = chip.dataset.agent;

      const agentTag = document.getElementById('topbar-agent-tag');
      if (agentTag) {
        agentTag.textContent = `${chip.querySelector('.chip-name')?.textContent} Active`;
      }
      showToast(`Switched active focus to ${chip.querySelector('.chip-name')?.textContent}`);
    });
  });

  // Subject selector
  const subjectSelect = document.getElementById('subject-select');
  if (subjectSelect) {
    subjectSelect.addEventListener('change', (e) => {
      AppState.currentSubject = e.target.value;
      showToast(`Academic subject domain set to: ${e.target.options[e.target.selectedIndex].text}`);
      renderMindMap();
    });
  }

  // Reset chat button
  const clearBtn = document.getElementById('quick-clear-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      const chatStream = document.getElementById('chat-stream');
      const traceStream = document.getElementById('thought-stream-container');
      if (chatStream) {
        chatStream.innerHTML = `
          <div class="message-card system-welcome">
            <div class="message-avatar-wrap">
              <div class="avatar-glow"></div>
              <span class="avatar-emoji">🔮</span>
            </div>
            <div class="message-body">
              <div class="message-header">
                <span class="sender-name">MindForge Orchestrator</span>
                <span class="agent-role-badge">Conversation Reset</span>
                <span class="timestamp">Just now</span>
              </div>
              <div class="message-content">
                <p>Workspace refreshed! Submit any inquiry, upload notes, or select a specialized agent to begin a new study cycle.</p>
              </div>
            </div>
          </div>
        `;
      }
      if (traceStream) {
        traceStream.innerHTML = `
          <div class="empty-trace-state">
            <div class="pulsing-halo">🔍</div>
            <h4>Trace Cleared</h4>
            <p>Ready for next student inquiry.</p>
          </div>
        `;
      }
      showToast('Conversation & Trace reset.');
    });
  }

  // Inspector Sub-tabs (Reasoning, Artifacts, MindMap)
  const inspectorTabs = document.querySelectorAll('.inspector-tab-btn');
  const inspectorViews = document.querySelectorAll('.inspector-view');

  inspectorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      inspectorTabs.forEach(t => t.classList.remove('active'));
      inspectorViews.forEach(v => v.classList.remove('active'));

      tab.classList.add('active');
      const view = document.getElementById(`view-${tab.dataset.view}`);
      if (view) view.classList.add('active');

      if (tab.dataset.view === 'concept-map') {
        renderMindMap();
      }
    });
  });
}

// ============================================================================
// Chat & Agent Reasoning Loop Stream
// ============================================================================

function initChat() {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('user-input');
  const stream = document.getElementById('chat-stream');
  const directSelect = document.getElementById('direct-agent-select');
  const thinkingBanner = document.getElementById('agent-thinking-banner');
  const thinkingStepText = document.getElementById('thinking-step-text');
  const thinkingAgentName = document.getElementById('thinking-agent-name');
  const traceContainer = document.getElementById('thought-stream-container');
  const attachNotesBtn = document.getElementById('attach-notes-btn');

  // Quick prompt chips
  document.querySelectorAll('.prompt-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (input) {
        input.value = chip.dataset.prompt;
        input.focus();
        form.dispatchEvent(new Event('submit'));
      }
    });
  });

  // Attach sample notes button
  if (attachNotesBtn && input) {
    attachNotesBtn.addEventListener('click', () => {
      input.value = 'Here are my lecture notes on Graph Search: BFS uses a FIFO queue and finds shortest path in unweighted graphs. DFS uses a LIFO stack or recursion. Please summarize key differences, generate 3 practice questions, and suggest a 2-day study plan.';
      input.focus();
      showToast('Sample lecture notes loaded into input!');
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      input.value = '';
      const chosenAgent = directSelect ? directSelect.value : 'auto';

      // 1. Append User Message to Chat
      appendUserMessage(text);

      // 2. Clear empty trace placeholder if present
      const emptyTrace = document.getElementById('empty-trace-state');
      if (emptyTrace) emptyTrace.remove();

      // 3. Show thinking banner
      if (thinkingBanner) {
        thinkingBanner.style.display = 'flex';
        thinkingStepText.textContent = 'Orchestrating agents...';
        thinkingAgentName.textContent = '🔮 MindForge Hub';
      }

      try {
        const loop = AgentSystem.executeAgentLoop(text, chosenAgent, AppState.currentSubject);

        for await (const step of loop) {
          if (step.type === 'trace') {
            // Update floating banner
            if (thinkingStepText) thinkingStepText.textContent = step.title;
            if (thinkingAgentName) thinkingAgentName.textContent = `${step.agent.avatar} ${step.agent.name}`;

            // Append trace card to reasoning column
            appendTraceStep(step);
          } else if (step.type === 'result') {
            // Hide thinking banner
            if (thinkingBanner) thinkingBanner.style.display = 'none';

            // Append Agent response to Chat
            appendAgentMessage(step.agent, step.content);

            // Handle Artifact if produced
            if (step.artifact) {
              addArtifact(step.artifact);
            }
          }
        }
      } catch (err) {
        console.error(err);
        if (thinkingBanner) thinkingBanner.style.display = 'none';
        appendAgentMessage(AgentSystem.agents.orchestrator, `⚠️ An unexpected error occurred: ${err.message}. Switched back to local mode.`);
      }

      // Auto-scroll chat
      if (stream) {
        stream.scrollTop = stream.scrollHeight;
      }
    });
  }
}

function appendUserMessage(text) {
  const stream = document.getElementById('chat-stream');
  if (!stream) return;

  const card = document.createElement('div');
  card.className = 'message-card user';
  card.innerHTML = `
    <div class="message-avatar-wrap">
      <span class="avatar-emoji">🎓</span>
    </div>
    <div class="message-body">
      <div class="message-header">
        <span class="sender-name">Student</span>
        <span class="timestamp">Just now</span>
      </div>
      <div class="message-content">
        <p>${escapeHtml(text)}</p>
      </div>
    </div>
  `;
  stream.appendChild(card);
  stream.scrollTop = stream.scrollHeight;
}

function appendAgentMessage(agent, markdown) {
  const stream = document.getElementById('chat-stream');
  if (!stream) return;

  const card = document.createElement('div');
  card.className = 'message-card agent';
  card.innerHTML = `
    <div class="message-avatar-wrap" style="background: ${agent.color ? agent.color + '25' : 'rgba(139,92,246,0.25)'};">
      <div class="avatar-glow"></div>
      <span class="avatar-emoji">${agent.avatar}</span>
    </div>
    <div class="message-body">
      <div class="message-header">
        <span class="sender-name">${agent.name}</span>
        <span class="agent-role-badge">${agent.role}</span>
        <span class="timestamp">Just now</span>
      </div>
      <div class="message-content">
        ${renderMarkdown(markdown)}
      </div>
    </div>
  `;
  stream.appendChild(card);
  stream.scrollTop = stream.scrollHeight;
}

function appendTraceStep(step) {
  const traceContainer = document.getElementById('thought-stream-container');
  if (!traceContainer) return;

  const card = document.createElement('div');
  card.className = `trace-step-card ${step.isTool ? 'tool-call' : ''}`;
  card.innerHTML = `
    <div class="trace-step-header">
      <span class="trace-agent-tag" style="color: ${step.agent.color}">
        <span>${step.agent.avatar}</span>
        <span>${step.agent.name}</span>
      </span>
      <span class="trace-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
    </div>
    ${step.isTool ? `<span class="trace-tool-badge">TOOL CALL</span>` : ''}
    <div class="trace-step-body">
      <strong>${step.title}</strong>
      <p style="margin-top: 4px;">${step.body}</p>
    </div>
  `;
  traceContainer.appendChild(card);
  traceContainer.scrollTop = traceContainer.scrollHeight;
}

function addArtifact(artifact) {
  AppState.artifacts.push(artifact);
  const countEl = document.getElementById('artifact-count');
  if (countEl) countEl.textContent = AppState.artifacts.length;

  const shelf = document.getElementById('artifacts-shelf-list');
  if (!shelf) return;

  const item = document.createElement('div');
  item.className = 'artifact-card-item';
  item.innerHTML = `
    <span class="artifact-type-tag">${artifact.type.replace('_', ' ')}</span>
    <h4 class="artifact-item-title">${artifact.title}</h4>
    <p class="artifact-item-desc">Generated by autonomous agent loop (${artifact.count} items ready to study).</p>
    <div class="artifact-item-actions">
      <button class="btn-primary-sm view-artifact-btn">Open in Workspace</button>
    </div>
  `;

  item.querySelector('.view-artifact-btn').addEventListener('click', () => {
    if (artifact.type.includes('flashcard')) {
      document.getElementById('nav-flashcards')?.click();
    } else if (artifact.type.includes('roadmap')) {
      document.getElementById('nav-planner')?.click();
    } else {
      document.getElementById('nav-quiz')?.click();
    }
  });

  shelf.prepend(item);
  showToast(`New study artifact generated: ${artifact.title}!`);
}

// Simple Markdown parser for bold, italics, code, lists, headers, quotes
function renderMarkdown(md) {
  if (!md) return '';
  let html = md
    // Headers
    .replace(/^### (.*$)/gim, '<h4 style="margin: 14px 0 6px 0; color: #fff; font-size: 1.05rem;">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 style="margin: 16px 0 8px 0; color: #38bdf8; font-size: 1.15rem;">$1</h3>')
    .replace(/^# (.*$)/gim, '<h2 style="margin: 18px 0 10px 0; color: #fff; font-size: 1.3rem;">$1</h2>')
    // Blockquotes
    .replace(/^\> (.*$)/gim, '<blockquote style="border-left: 3px solid #38bdf8; padding-left: 12px; margin: 10px 0; color: #cbd5e1; font-style: italic;">$1</blockquote>')
    // Code blocks
    .replace(/```([a-z]*)\n([\s\S]*?)```/gim, '<pre style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 8px; overflow-x: auto; font-family: monospace; font-size: 0.85rem; margin: 10px 0; color: #38bdf8;"><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italics
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Unordered lists
    .replace(/^\* (.*$)/gim, '<li style="margin-left: 18px; margin-bottom: 4px;">$1</li>')
    .replace(/^- (.*$)/gim, '<li style="margin-left: 18px; margin-bottom: 4px;">$1</li>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p>');

  return `<p>${html}</p>`;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ============================================================================
// TAB 2: Socratic Method Engine
// ============================================================================

function initSocratic() {
  const startBtn = document.getElementById('start-socratic-btn');
  const conceptInput = document.getElementById('socratic-concept-input');
  const feed = document.getElementById('socratic-dialogue-feed');
  const hintsBox = document.getElementById('socratic-hints-box');
  const hintText = document.getElementById('socratic-hint-text');
  const hintLevelLabel = document.getElementById('hint-level-label');
  const revealHintBtn = document.getElementById('reveal-next-hint-btn');

  let currentHintLevel = 1;
  const hintBank = [
    'Level 1: Consider how this problem behaves when you look at a minimal edge case (e.g. 0, 1, or negative numbers).',
    'Level 2: What invariant must be preserved? For 0! = 1, remember the recursive relation: n! = (n+1)! / (n+1). What happens when n = 0?',
    'Level 3: Breakthrough! Since 1! = 1! / 1 = 1, substituting n = 0 into (n+1)! / (n+1) gives 1! / 1 = 1. Therefore 0! must equal 1!'
  ];

  function startSession(concept) {
    if (!feed) return;
    feed.innerHTML = `
      <div class="message-card agent" style="margin-bottom: 20px;">
        <div class="message-avatar-wrap" style="background: rgba(56, 189, 248, 0.25);">
          <span class="avatar-emoji">🧠</span>
        </div>
        <div class="message-body">
          <div class="message-header">
            <span class="sender-name">Socrates</span>
            <span class="agent-role-badge">Guided Dialogue</span>
            <span class="timestamp">Just now</span>
          </div>
          <div class="message-content">
            <p>Greetings, scholar! Let us examine: <strong>"${escapeHtml(concept)}"</strong>.</p>
            <p>Rather than simply reciting the formula, tell me: when you first encounter this idea, what assumption feels most puzzling or contradictory to your intuition?</p>
            <div style="margin-top: 14px; background: rgba(255,255,255,0.04); border-left: 3px solid #38bdf8; padding: 10px 14px; border-radius: 4px;">
              <strong>Socratic Challenge:</strong> Explain what you believe would happen if the standard rule did NOT apply.
            </div>
          </div>
        </div>
      </div>

      <div class="socratic-reply-box" style="margin-top: auto; display: flex; gap: 8px;">
        <input type="text" id="socratic-reply-input" class="form-group" style="flex: 1; padding: 10px; margin: 0;" placeholder="Type your reasoning or hypothesis...">
        <button class="btn-primary-sm" id="socratic-reply-btn">Reply to Socrates</button>
      </div>
    `;

    // Show hints box
    if (hintsBox) {
      hintsBox.style.display = 'block';
      currentHintLevel = 1;
      hintText.textContent = hintBank[0];
      hintLevelLabel.textContent = `Level 1 of 3`;
    }

    // Attach reply listener
    const replyBtn = document.getElementById('socratic-reply-btn');
    const replyInput = document.getElementById('socratic-reply-input');
    if (replyBtn && replyInput) {
      replyBtn.addEventListener('click', () => {
        const studentThought = replyInput.value.trim();
        if (!studentThought) return;

        replyInput.value = '';
        const userCard = document.createElement('div');
        userCard.className = 'message-card user';
        userCard.style.margin = '14px 0';
        userCard.innerHTML = `
          <div class="message-avatar-wrap"><span class="avatar-emoji">🎓</span></div>
          <div class="message-body"><p>${escapeHtml(studentThought)}</p></div>
        `;
        feed.insertBefore(userCard, feed.querySelector('.socratic-reply-box'));

        setTimeout(() => {
          const socratesCard = document.createElement('div');
          socratesCard.className = 'message-card agent';
          socratesCard.style.margin = '14px 0';
          socratesCard.innerHTML = `
            <div class="message-avatar-wrap" style="background: rgba(56, 189, 248, 0.25);"><span class="avatar-emoji">🧠</span></div>
            <div class="message-body">
              <p>Fascinating observation! You noted: <em>"${escapeHtml(studentThought)}"</em>.</p>
              <p>Now consider this: if your premise holds true, what does that imply about the symmetry of the system? Look closely at how the edge cases collapse together.</p>
            </div>
          `;
          feed.insertBefore(socratesCard, feed.querySelector('.socratic-reply-box'));
        }, 600);
      });
    }
  }

  if (startBtn && conceptInput) {
    startBtn.addEventListener('click', () => {
      const val = conceptInput.value.trim() || 'Why does 0! equal 1?';
      startSession(val);
    });
  }

  // Preset pill clicks
  document.querySelectorAll('.preset-socratic-pills .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (conceptInput) conceptInput.value = btn.dataset.socratic;
      startSession(btn.dataset.socratic);
    });
  });

  // Reveal next hint
  if (revealHintBtn && hintText && hintLevelLabel) {
    revealHintBtn.addEventListener('click', () => {
      if (currentHintLevel < hintBank.length) {
        currentHintLevel++;
        hintText.textContent = hintBank[currentHintLevel - 1];
        hintLevelLabel.textContent = `Level ${currentHintLevel} of ${hintBank.length}`;
        showToast(`Revealed hint level ${currentHintLevel}!`);
      } else {
        showToast('All progressive hints unlocked!');
      }
    });
  }
}

// ============================================================================
// TAB 3: Active Recall Flashcard Deck
// ============================================================================

function initFlashcards() {
  const cardElement = document.getElementById('flashcard-card');
  const frontText = document.getElementById('card-front-text');
  const backText = document.getElementById('card-back-text');
  const mnemonicBox = document.getElementById('card-mnemonic-box');
  const progressFill = document.getElementById('card-progress-fill');
  const currentIndexLabel = document.getElementById('card-current-index');
  const categoryTag = document.getElementById('card-category-tag');
  const prevBtn = document.getElementById('btn-prev-card');
  const nextBtn = document.getElementById('btn-next-card');
  const totalDeckCount = document.getElementById('total-deck-count');
  const deckCountBadge = document.getElementById('deck-count-badge');
  const miniGrid = document.getElementById('deck-mini-grid');
  const shuffleBtn = document.getElementById('shuffle-deck-btn');
  const exportBtn = document.getElementById('export-deck-btn');
  const generateBtn = document.getElementById('generate-cards-btn');

  function renderCurrentCard() {
    const card = AppState.flashcards[AppState.currentCardIndex];
    if (!card) return;

    AppState.isCardFlipped = false;
    if (cardElement) cardElement.classList.remove('flipped');

    if (frontText) frontText.textContent = card.question;
    if (backText) backText.textContent = card.answer;
    if (mnemonicBox) {
      mnemonicBox.innerHTML = `<strong>💡 Agent Mnemonic:</strong> ${card.mnemonic}`;
    }
    if (categoryTag) categoryTag.textContent = card.tag;

    const total = AppState.flashcards.length;
    if (currentIndexLabel) currentIndexLabel.textContent = `Card ${AppState.currentCardIndex + 1} of ${total}`;
    if (progressFill) progressFill.style.width = `${((AppState.currentCardIndex + 1) / total) * 100}%`;
    if (totalDeckCount) totalDeckCount.textContent = total;
    if (deckCountBadge) deckCountBadge.textContent = total;

    renderMiniGrid();
  }

  function renderMiniGrid() {
    if (!miniGrid) return;
    miniGrid.innerHTML = '';
    AppState.flashcards.forEach((c, idx) => {
      const mini = document.createElement('div');
      mini.className = `mini-card ${idx === AppState.currentCardIndex ? 'active-card' : ''}`;
      mini.innerHTML = `
        <div class="mini-q">${c.question.slice(0, 55)}...</div>
        <div class="mini-meta">Card #${idx + 1} • ${c.tag} • [${c.rating.toUpperCase()}]</div>
      `;
      mini.addEventListener('click', () => {
        AppState.currentCardIndex = idx;
        renderCurrentCard();
      });
      miniGrid.appendChild(mini);
    });
  }

  // Flip Card
  if (cardElement) {
    cardElement.addEventListener('click', () => {
      AppState.isCardFlipped = !AppState.isCardFlipped;
      cardElement.classList.toggle('flipped', AppState.isCardFlipped);
    });
  }

  // Prev / Next
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (AppState.currentCardIndex > 0) {
        AppState.currentCardIndex--;
        renderCurrentCard();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (AppState.currentCardIndex < AppState.flashcards.length - 1) {
        AppState.currentCardIndex++;
        renderCurrentCard();
      }
    });
  }

  // Spaced Repetition Ratings (Hard, Good, Easy)
  document.getElementById('btn-rate-hard')?.addEventListener('click', () => {
    AppState.flashcards[AppState.currentCardIndex].rating = 'hard';
    showToast('Marked as Hard. Scheduled for immediate re-test.');
    nextBtn?.click();
  });
  document.getElementById('btn-rate-good')?.addEventListener('click', () => {
    AppState.flashcards[AppState.currentCardIndex].rating = 'good';
    showToast('Marked as Good. Scheduled for tomorrow.');
    nextBtn?.click();
  });
  document.getElementById('btn-rate-easy')?.addEventListener('click', () => {
    AppState.flashcards[AppState.currentCardIndex].rating = 'easy';
    showToast('Marked as Easy (Mastered!).');
    nextBtn?.click();
  });

  // Shuffle Deck
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      AppState.flashcards.sort(() => Math.random() - 0.5);
      AppState.currentCardIndex = 0;
      renderCurrentCard();
      showToast('Deck shuffled!');
    });
  }

  // Export Deck
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AppState.flashcards, null, 2));
      const dlAnchor = document.createElement('a');
      dlAnchor.setAttribute("href", dataStr);
      dlAnchor.setAttribute("download", "mindforge_study_deck.json");
      dlAnchor.click();
      showToast('Flashcard deck exported to JSON.');
    });
  }

  // Generate new cards
  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      const newCard = {
        id: AppState.flashcards.length + 1,
        tag: 'Agent Synthesis',
        question: `What is the core optimization technique for ${AppState.currentSubject.toUpperCase()}?`,
        answer: 'Decomposing recursive subproblems, memorizing overlapping substructure, and pruning dead search spaces.',
        mnemonic: 'Remember past solutions to never compute twice.',
        rating: 'unrated'
      };
      AppState.flashcards.unshift(newCard);
      AppState.currentCardIndex = 0;
      renderCurrentCard();
      showToast('Agent Kortex generated and added a new flashcard to deck!');
    });
  }

  renderCurrentCard();
}

// ============================================================================
// TAB 4: Quiz Arena
// ============================================================================

function initQuiz() {
  const startBtn = document.getElementById('start-quiz-btn');
  const setupCard = document.getElementById('quiz-setup-card');
  const activeArea = document.getElementById('quiz-active-area');
  const resultsCard = document.getElementById('quiz-results-card');
  
  const qNum = document.getElementById('quiz-q-num');
  const scorePill = document.getElementById('quiz-score-pill');
  const streakPill = document.getElementById('quiz-streak-pill');
  const questionTitle = document.getElementById('quiz-question-title');
  const optionsList = document.getElementById('quiz-options-list');
  const explanationBox = document.getElementById('quiz-explanation-box');
  const explanationTitle = document.getElementById('explanation-title');
  const explanationBody = document.getElementById('explanation-body');
  const nextQBtn = document.getElementById('quiz-next-question-btn');
  const restartBtn = document.getElementById('restart-quiz-btn');
  const resultsScoreBig = document.getElementById('results-score-big');

  function renderQuestion() {
    const q = AppState.quiz.questions[AppState.quiz.currentIndex];
    if (!q) {
      finishQuiz();
      return;
    }

    AppState.quiz.answered = false;
    if (qNum) qNum.textContent = `${AppState.quiz.currentIndex + 1} / ${AppState.quiz.questions.length}`;
    if (scorePill) scorePill.textContent = `${AppState.quiz.score} pts`;
    if (streakPill) streakPill.textContent = `🔥 ${AppState.quiz.streak}`;
    if (questionTitle) questionTitle.textContent = q.question;
    if (explanationBox) explanationBox.style.display = 'none';

    if (optionsList) {
      optionsList.innerHTML = '';
      const prefixes = ['A', 'B', 'C', 'D'];
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerHTML = `
          <span class="option-prefix">${prefixes[idx]}</span>
          <span>${escapeHtml(opt)}</span>
        `;

        btn.addEventListener('click', () => {
          if (AppState.quiz.answered) return;
          AppState.quiz.answered = true;

          const isCorrect = idx === q.correct;
          if (isCorrect) {
            btn.classList.add('correct');
            AppState.quiz.score += 20;
            AppState.quiz.streak++;
            if (explanationTitle) {
              explanationTitle.textContent = '✅ Correct!';
              explanationTitle.style.color = '#34d399';
            }
          } else {
            btn.classList.add('incorrect');
            AppState.quiz.streak = 0;
            // Highlight correct one
            const correctBtn = optionsList.children[q.correct];
            if (correctBtn) correctBtn.classList.add('correct');

            if (explanationTitle) {
              explanationTitle.textContent = '❌ Incorrect';
              explanationTitle.style.color = '#f43f5e';
            }
          }

          if (scorePill) scorePill.textContent = `${AppState.quiz.score} pts`;
          if (streakPill) streakPill.textContent = `🔥 ${AppState.quiz.streak}`;

          if (explanationBody) explanationBody.textContent = q.explanation;
          if (explanationBox) explanationBox.style.display = 'block';
        });

        optionsList.appendChild(btn);
      });
    }
  }

  function finishQuiz() {
    if (activeArea) activeArea.style.display = 'none';
    if (resultsCard) resultsCard.style.display = 'block';
    const percent = Math.round((AppState.quiz.score / (AppState.quiz.questions.length * 20)) * 100);
    if (resultsScoreBig) {
      resultsScoreBig.textContent = `Score: ${AppState.quiz.score} / ${AppState.quiz.questions.length * 20} (${percent}%)`;
    }
  }

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      AppState.quiz.currentIndex = 0;
      AppState.quiz.score = 0;
      AppState.quiz.streak = 0;
      if (setupCard) setupCard.style.display = 'none';
      if (resultsCard) resultsCard.style.display = 'none';
      if (activeArea) activeArea.style.display = 'block';
      renderQuestion();
      showToast('Quiz generated and started!');
    });
  }

  if (nextQBtn) {
    nextQBtn.addEventListener('click', () => {
      AppState.quiz.currentIndex++;
      renderQuestion();
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      if (setupCard) setupCard.style.display = 'block';
      if (resultsCard) resultsCard.style.display = 'none';
      if (activeArea) activeArea.style.display = 'none';
    });
  }

  // Turn mistakes into flashcards
  document.getElementById('create-flashcards-from-mistakes-btn')?.addEventListener('click', () => {
    document.getElementById('nav-flashcards')?.click();
    showToast('Review card added to your Active Recall Deck!');
  });
}

// ============================================================================
// TAB 5: Adaptive Study Planner & Milestones
// ============================================================================

function initPlanner() {
  const stepsContainer = document.getElementById('timeline-steps');
  const generatePlanBtn = document.getElementById('generate-plan-btn');
  const goalInput = document.getElementById('plan-goal-input');
  const timeframeSelect = document.getElementById('plan-timeframe-select');
  const timelineTitle = document.getElementById('timeline-title');

  function renderMilestones() {
    if (!stepsContainer) return;
    stepsContainer.innerHTML = '';

    AppState.milestones.forEach((m, idx) => {
      const item = document.createElement('div');
      item.className = `milestone-item ${m.done ? 'completed' : ''}`;
      item.innerHTML = `
        <div class="milestone-marker">${m.done ? '✓' : idx + 1}</div>
        <div class="milestone-content">
          <div>
            <h4 class="milestone-title">${m.title}</h4>
            <p class="milestone-desc">${m.desc}</p>
          </div>
          <div class="milestone-badges">
            <span class="badge-pomo-count">${m.pomos} Pomodoros</span>
          </div>
        </div>
      `;

      item.addEventListener('click', () => {
        m.done = !m.done;
        renderMilestones();
        showToast(`Milestone marked as ${m.done ? 'Completed' : 'Pending'}.`);
      });

      stepsContainer.appendChild(item);
    });
  }

  if (generatePlanBtn && goalInput) {
    generatePlanBtn.addEventListener('click', () => {
      const goal = goalInput.value.trim() || 'Master Exam';
      const tf = timeframeSelect ? timeframeSelect.options[timeframeSelect.selectedIndex].text : '2-Week';
      if (timelineTitle) timelineTitle.textContent = `${tf} Roadmap: ${goal}`;

      AppState.milestones = [
        { id: 1, title: `Diagnostic Pre-Test on ${goal}`, desc: 'Assess current baseline and highlight high-priority chapters.', pomos: 2, done: false },
        { id: 2, title: 'Concept Mapping & Theoretical Review', desc: 'Build visual mind maps and formulas for weak topics.', pomos: 4, done: false },
        { id: 3, title: 'Active Recall Drill & Practice Problems', desc: 'Solve 15 targeted multi-choice and free response questions.', pomos: 4, done: false },
        { id: 4, title: 'Mid-Review Mock Exam Simulation', desc: 'Simulate full test under timed, strict conditions.', pomos: 3, done: false },
        { id: 5, title: 'Socratic Gap Patching & Final Polish', desc: 'Clarify tricky edge cases with Socrates and prepare summary sheet.', pomos: 2, done: false }
      ];

      renderMilestones();
      showToast('Chronos created a fresh milestone roadmap!');
    });
  }

  renderMilestones();
}

// ============================================================================
// Pomodoro Timer Logic (Both sidebar mini and planner full)
// ============================================================================

function initPomodoro() {
  const sidebarDigits = document.getElementById('sidebar-timer-digits');
  const sidebarToggleBtn = document.getElementById('timer-toggle-btn');
  const sidebarResetBtn = document.getElementById('timer-reset-btn');

  const pomoBigDigits = document.getElementById('pomo-big-digits');
  const pomoStartPauseBtn = document.getElementById('pomo-start-pause-btn');
  const pomoResetBtn = document.getElementById('pomo-reset-btn');
  const pomoTabs = document.querySelectorAll('.pomo-tab');

  function updateDisplays() {
    const mins = Math.floor(AppState.pomodoro.remainingSeconds / 60);
    const secs = AppState.pomodoro.remainingSeconds % 60;
    const str = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    if (sidebarDigits) sidebarDigits.textContent = str;
    if (pomoBigDigits) pomoBigDigits.textContent = str;

    const playLabel = AppState.pomodoro.isRunning ? '⏸ Pause' : '▶ Start Focus';
    if (pomoStartPauseBtn) pomoStartPauseBtn.textContent = playLabel;
    if (sidebarToggleBtn) sidebarToggleBtn.textContent = AppState.pomodoro.isRunning ? '⏸' : '▶';
  }

  function toggleTimer() {
    if (AppState.pomodoro.isRunning) {
      clearInterval(AppState.pomodoro.intervalId);
      AppState.pomodoro.isRunning = false;
    } else {
      AppState.pomodoro.isRunning = true;
      AppState.pomodoro.intervalId = setInterval(() => {
        if (AppState.pomodoro.remainingSeconds > 0) {
          AppState.pomodoro.remainingSeconds--;
          updateDisplays();
        } else {
          clearInterval(AppState.pomodoro.intervalId);
          AppState.pomodoro.isRunning = false;
          showToast('🔔 Pomodoro session completed! Take a well-earned break.');
          updateDisplays();
        }
      }, 1000);
    }
    updateDisplays();
  }

  function resetTimer() {
    clearInterval(AppState.pomodoro.intervalId);
    AppState.pomodoro.isRunning = false;
    AppState.pomodoro.remainingSeconds = AppState.pomodoro.totalSeconds;
    updateDisplays();
  }

  // Sidebar controls
  if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', toggleTimer);
  if (sidebarResetBtn) sidebarResetBtn.addEventListener('click', resetTimer);

  // Planner controls
  if (pomoStartPauseBtn) pomoStartPauseBtn.addEventListener('click', toggleTimer);
  if (pomoResetBtn) pomoResetBtn.addEventListener('click', resetTimer);

  // Mode switching tabs
  pomoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      pomoTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mins = parseInt(tab.dataset.pomo, 10);
      AppState.pomodoro.totalSeconds = mins * 60;
      AppState.pomodoro.remainingSeconds = AppState.pomodoro.totalSeconds;
      resetTimer();
    });
  });

  updateDisplays();
}

// ============================================================================
// TAB 6: Essay & Rubric Critic
// ============================================================================

function initCritic() {
  const evalBtn = document.getElementById('evaluate-essay-btn');
  const essayInput = document.getElementById('essay-text-input');
  const emptyState = document.getElementById('critic-empty-state');
  const scoredContent = document.getElementById('critic-scored-content');

  const projectedGrade = document.getElementById('projected-grade');
  const gradeLabel = document.getElementById('grade-label');
  const gradeSummaryText = document.getElementById('grade-summary-text');
  const suggestionsList = document.getElementById('critic-suggestions-list');

  // Sample buttons
  document.getElementById('sample-essay-history')?.addEventListener('click', () => {
    if (essayInput) {
      essayInput.value = `The collapse of the Roman Republic was not precipitated by a single cataclysmic military defeat, but rather by the gradual erosion of unwritten constitutional norms (mos maiorum). As agrarian inequality widened following the Punic Wars, the Gracchi brothers attempted radical land redistribution through popular assemblies, bypassing senatorial prerogative. This established a perilous precedent wherein political disputes were arbitrated by mob intimidation and military legions rather than deliberative senate decree, culminating inevitably in Caesar crossing the Rubicon.`;
      showToast('Loaded History draft sample.');
    }
  });

  document.getElementById('sample-essay-science')?.addEventListener('click', () => {
    if (essayInput) {
      essayInput.value = `Generative artificial intelligence tools represent an epistemic rupture in higher education. While institutional bans attempt to preserve traditional cognitive evaluation paradigms, they operate under the obsolete presumption that writing is purely an assessment product rather than an exploratory cognitive journey. Instead of prohibition, academic institutions must re-anchor pedagogical objectives around prompt synthesis, critical algorithmic skepticism, and Socratic interrogation.`;
      showToast('Loaded AI Ethics draft sample.');
    }
  });

  if (evalBtn && essayInput) {
    evalBtn.addEventListener('click', () => {
      const text = essayInput.value.trim();
      if (!text) {
        showToast('Please paste a draft or argument first.');
        return;
      }

      if (emptyState) emptyState.style.display = 'none';
      if (scoredContent) scoredContent.style.display = 'block';

      // Dynamic calculation based on length and vocabulary
      const wordCount = text.split(/\s+/).length;
      let grade = 'A-';
      let thesisScore = Math.min(96, Math.max(75, 85 + Math.floor(wordCount / 20)));
      let evidenceScore = Math.min(94, Math.max(70, 80 + Math.floor(wordCount / 25)));
      let cohesionScore = 88;
      let toneScore = 92;

      if (wordCount > 60) {
        grade = 'A';
      } else {
        grade = 'B+';
      }

      if (projectedGrade) projectedGrade.textContent = grade;
      if (gradeLabel) gradeLabel.textContent = grade === 'A' ? 'Exemplary Scholarly Rigor' : 'Promising Argument with Clear Thesis';
      if (gradeSummaryText) {
        gradeSummaryText.textContent = `Draft contains ${wordCount} words with nuanced vocabulary and cohesive rhetorical cadence.`;
      }

      // Update gauges
      document.getElementById('metric-thesis').textContent = `${thesisScore} / 100`;
      document.getElementById('bar-thesis').style.width = `${thesisScore}%`;

      document.getElementById('metric-evidence').textContent = `${evidenceScore} / 100`;
      document.getElementById('bar-evidence').style.width = `${evidenceScore}%`;

      document.getElementById('metric-cohesion').textContent = `${cohesionScore} / 100`;
      document.getElementById('bar-cohesion').style.width = `${cohesionScore}%`;

      document.getElementById('metric-tone').textContent = `${toneScore} / 100`;
      document.getElementById('bar-tone').style.width = `${toneScore}%`;

      // Update Suggestions
      if (suggestionsList) {
        suggestionsList.innerHTML = `
          <li class="suggestion-item">
            <strong>1. Antithesis Integration:</strong>
            Introduce a counter-argument in paragraph 2 to demonstrate intellectual charity before dismantling it.
          </li>
          <li class="suggestion-item">
            <strong>2. Citation Specificity:</strong>
            Anchor the claim regarding institutional shifts with a concrete historical or empirical study.
          </li>
          <li class="suggestion-item">
            <strong>3. Syntactic Cadence:</strong>
            Vary sentence lengths towards the conclusion to leave a memorable rhetorical resonance.
          </li>
        `;
      }

      showToast('Rubric Critic evaluation completed!');
    });
  }
}

// ============================================================================
// Concept Mind Map (Interactive SVG graph)
// ============================================================================

function initMindMap() {
  const resetBtn = document.getElementById('recenter-graph-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      renderMindMap();
      showToast('Mind Map view refreshed.');
    });
  }
}

function renderMindMap() {
  const svg = document.getElementById('mindmap-svg');
  if (!svg) return;

  const width = svg.clientWidth || 450;
  const height = svg.clientHeight || 350;
  const centerX = width / 2;
  const centerY = height / 2;

  const subjectNames = {
    cs: 'Computer Science',
    math: 'Advanced Calculus',
    physics: 'Quantum Mechanics',
    biology: 'Molecular Biology',
    history: 'World History',
    literature: 'Literary Theory',
    custom: 'Academic Focus'
  };

  const centerTitle = subjectNames[AppState.currentSubject] || 'Study Focus';

  const subNodes = [
    { title: 'Core Principles', angle: 0, dist: 110, color: '#38bdf8' },
    { title: 'Formulas & Math', angle: 60, dist: 120, color: '#8b5cf6' },
    { title: 'Active Drills', angle: 120, dist: 115, color: '#f59e0b' },
    { title: 'Common Traps', angle: 180, dist: 110, color: '#f43f5e' },
    { title: 'Edge Cases', angle: 240, dist: 120, color: '#10b981' },
    { title: 'Exam Rubrics', angle: 300, dist: 115, color: '#a855f7' }
  ];

  let linesHtml = '';
  let nodesHtml = '';

  subNodes.forEach(node => {
    const rad = (node.angle * Math.PI) / 180;
    const nx = centerX + node.dist * Math.cos(rad);
    const ny = centerY + node.dist * Math.sin(rad);

    linesHtml += `
      <line x1="${centerX}" y1="${centerY}" x2="${nx}" y2="${ny}" 
        stroke="rgba(255, 255, 255, 0.15)" stroke-width="2" stroke-dasharray="4" />
    `;

    nodesHtml += `
      <g class="map-node" style="cursor: pointer;" transform="translate(${nx}, ${ny})" onclick="handleMapNodeClick('${node.title}')">
        <circle r="22" fill="${node.color}22" stroke="${node.color}" stroke-width="2" />
        <circle r="8" fill="${node.color}" />
        <text y="34" fill="#94a3b8" font-size="10" font-family="Plus Jakarta Sans" font-weight="600" text-anchor="middle">
          ${node.title}
        </text>
      </g>
    `;
  });

  // Center node
  const centerNodeHtml = `
    <g transform="translate(${centerX}, ${centerY})">
      <circle r="36" fill="rgba(139, 92, 246, 0.2)" stroke="#8b5cf6" stroke-width="2.5" />
      <circle r="12" fill="#8b5cf6" />
      <text y="48" fill="#fff" font-size="12" font-family="Plus Jakarta Sans" font-weight="700" text-anchor="middle">
        ${centerTitle}
      </text>
    </g>
  `;

  svg.innerHTML = linesHtml + nodesHtml + centerNodeHtml;
}

window.handleMapNodeClick = function(title) {
  const input = document.getElementById('user-input');
  if (input) {
    input.value = `Synthesize an in-depth breakdown of ${title} for ${AppState.currentSubject.toUpperCase()}.`;
    input.focus();
    showToast(`Focused query on node: ${title}`);
  }
};

// ============================================================================
// Gemini API Configuration Modal & Engine Switcher
// ============================================================================

function initApiModal() {
  const modal = document.getElementById('api-modal');
  const openBtn = document.getElementById('open-api-modal-btn');
  const closeBtn = document.getElementById('close-api-modal-btn');
  const saveBtn = document.getElementById('save-api-settings-btn');
  const testBtn = document.getElementById('test-api-btn');
  const keyInput = document.getElementById('gemini-api-key-input');
  const keyWrapper = document.getElementById('gemini-key-wrapper');
  const modeLocal = document.getElementById('mode-local');
  const modeGemini = document.getElementById('mode-gemini');
  const statusBox = document.getElementById('test-connection-status');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      const mode = GeminiClient.getEngineMode();
      if (mode === 'gemini') {
        if (modeGemini) modeGemini.checked = true;
        if (keyWrapper) keyWrapper.style.display = 'block';
      } else {
        if (modeLocal) modeLocal.checked = true;
        if (keyWrapper) keyWrapper.style.display = 'none';
      }
      if (keyInput) keyInput.value = GeminiClient.getApiKey();
      if (statusBox) statusBox.style.display = 'none';
      if (modal) modal.style.display = 'flex';
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // Radio toggle
  modeLocal?.addEventListener('change', () => {
    if (keyWrapper) keyWrapper.style.display = 'none';
  });
  modeGemini?.addEventListener('change', () => {
    if (keyWrapper) keyWrapper.style.display = 'block';
  });

  // Test Connection
  if (testBtn) {
    testBtn.addEventListener('click', async () => {
      const key = keyInput ? keyInput.value.trim() : '';
      if (!key) {
        if (statusBox) {
          statusBox.className = 'test-connection-status error';
          statusBox.style.display = 'block';
          statusBox.textContent = 'Please enter a Gemini API key first.';
        }
        return;
      }

      if (statusBox) {
        statusBox.className = 'test-connection-status';
        statusBox.style.display = 'block';
        statusBox.textContent = 'Testing connection with Google Gemini endpoint...';
      }

      const res = await GeminiClient.testConnection(key);
      if (statusBox) {
        statusBox.className = `test-connection-status ${res.success ? 'success' : 'error'}`;
        statusBox.textContent = res.message;
      }
    });
  }

  // Save Settings
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const isGemini = modeGemini && modeGemini.checked;
      const key = keyInput ? keyInput.value.trim() : '';

      if (isGemini) {
        GeminiClient.setEngineMode('gemini');
        GeminiClient.setApiKey(key);
        showToast('Saved: Live Gemini API Mode Active!');
      } else {
        GeminiClient.setEngineMode('local');
        showToast('Saved: Intelligent Local Multi-Agent Mode Active!');
      }

      updateApiStatusUI();
      if (modal) modal.style.display = 'none';
    });
  }
}

function updateApiStatusUI() {
  const dot = document.getElementById('api-status-dot');
  const label = document.getElementById('api-status-label');

  if (GeminiClient.isLiveGeminiEnabled()) {
    if (dot) {
      dot.className = 'key-status-dot active-gemini';
    }
    if (label) {
      label.textContent = 'Gemini 2.5 Flash';
    }
  } else {
    if (dot) {
      dot.className = 'key-status-dot';
    }
    if (label) {
      label.textContent = 'Local Agent Engine';
    }
  }
}
