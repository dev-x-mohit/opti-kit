import "./index.css";
import {
  capitalize,
  slugify,
  truncate,
  camelCase,
  kebabCase,
  snakeCase,
  escapeHtml,
  unique,
  chunk,
  difference,
  intersection,
  shuffle,
  get,
  deepClone,
  clamp,
  round,
  random,
  isLeapYear,
  relativeTime,
  hexToRgb,
  isEmail,
  isUrl,
  isPhone,
  isStrongPassword,
  stripHtml,
  wordCount,
  copyToClipboard,
  debounce,
  throttle,
  once,
  uuid,
  fnv1a,
  safeStorage,
  EventEmitter,
} from "@dev_x_mohit/opti-kit";

// --- Tab Navigation Setup ---
const navItems = document.querySelectorAll(".nav-item");
const tabPanes = document.querySelectorAll(".tab-pane");

navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const tabName = item.getAttribute("data-tab");

    // Toggle nav active state
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");

    // Toggle tab panes visibility
    tabPanes.forEach((pane) => {
      pane.classList.remove("active");
      if (pane.id === `tab-${tabName}`) {
        pane.classList.add("active");
      }
    });
  });
});

// --- 1. Strings & Casing Utilities ---
const stringInput = document.getElementById("string-input") as HTMLInputElement;
const truncateLenInput = document.getElementById(
  "string-truncate-len"
) as HTMLInputElement;

function updateStringOutputs() {
  const val = stringInput.value;
  const len = parseInt(truncateLenInput.value) || 15;

  document.getElementById("out-camel")!.textContent = camelCase(val) || '""';
  document.getElementById("out-kebab")!.textContent = kebabCase(val) || '""';
  document.getElementById("out-snake")!.textContent = snakeCase(val) || '""';
  document.getElementById("out-capitalize")!.textContent =
    capitalize(val) || '""';
  document.getElementById("out-slug")!.textContent = slugify(val) || '""';
  document.getElementById("out-truncate")!.textContent =
    truncate(val, len) || '""';
  document.getElementById("out-escape")!.textContent =
    escapeHtml(val) || '""';
  document.getElementById("out-strip-html")!.textContent =
    stripHtml(val) || '""';
  document.getElementById("out-word-count")!.textContent =
    String(wordCount(val));
}

stringInput.addEventListener("input", updateStringOutputs);
truncateLenInput.addEventListener("input", updateStringOutputs);
updateStringOutputs();

// --- 2. Array & Set Operations ---
const arrayInput1 = document.getElementById("array-input-1") as HTMLInputElement;
const arrayInput2 = document.getElementById("array-input-2") as HTMLInputElement;
const arrayChunkSize = document.getElementById(
  "array-chunk-size"
) as HTMLInputElement;
const btnShuffle = document.getElementById("btn-shuffle-array");

function parseArray(inputVal: string): any[] {
  return inputVal
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (isNaN(Number(s)) ? s : Number(s)));
}

function updateArrayOutputs() {
  const arr1 = parseArray(arrayInput1.value);
  const arr2 = parseArray(arrayInput2.value);
  const size = parseInt(arrayChunkSize.value) || 2;

  document.getElementById("out-unique")!.textContent = JSON.stringify(
    unique(arr1)
  );
  document.getElementById("out-chunk")!.textContent = JSON.stringify(
    chunk(arr1, size)
  );
  document.getElementById("out-difference")!.textContent = JSON.stringify(
    difference(arr1, arr2)
  );
  document.getElementById("out-intersection")!.textContent = JSON.stringify(
    intersection(arr1, arr2)
  );
}

arrayInput1.addEventListener("input", updateArrayOutputs);
arrayInput2.addEventListener("input", updateArrayOutputs);
arrayChunkSize.addEventListener("input", updateArrayOutputs);

btnShuffle?.addEventListener("click", () => {
  const arr1 = parseArray(arrayInput1.value);
  const shuffled = shuffle(arr1);
  document.getElementById("out-shuffled")!.textContent =
    JSON.stringify(shuffled);
});
updateArrayOutputs();

// --- 3. Object Path Resolvers & Cloning ---
const objectInput = document.getElementById("object-input") as HTMLTextAreaElement;
const objectPath = document.getElementById("object-path") as HTMLInputElement;

function updateObjectOutputs() {
  try {
    const rawJson = objectInput.value;
    const parsedObj = JSON.parse(rawJson);
    const path = objectPath.value;

    const resolved = get(parsedObj, path, "Path not found");
    document.getElementById("out-object-get")!.textContent =
      typeof resolved === "object" ? JSON.stringify(resolved) : String(resolved);

    const clone = deepClone(parsedObj);
    const isReferenceEqual = clone === parsedObj;
    document.getElementById("out-object-clone")!.textContent =
      `Cloned: ${JSON.stringify(clone)}\nIs Reference Same? ${isReferenceEqual}`;
  } catch (error: any) {
    document.getElementById("out-object-get")!.textContent =
      "Invalid JSON Object Input";
    document.getElementById("out-object-clone")!.textContent = "";
  }
}

objectInput.addEventListener("input", updateObjectOutputs);
objectPath.addEventListener("input", updateObjectOutputs);
updateObjectOutputs();

// --- 4. Math Precision & Limits ---
const clampVal = document.getElementById("math-clamp-val") as HTMLInputElement;
const clampMin = document.getElementById("math-clamp-min") as HTMLInputElement;
const clampMax = document.getElementById("math-clamp-max") as HTMLInputElement;

const roundVal = document.getElementById("math-round-val") as HTMLInputElement;
const roundDec = document.getElementById("math-round-dec") as HTMLInputElement;

function updateMathOutputs() {
  const cv = parseFloat(clampVal.value) || 0;
  const cmin = parseFloat(clampMin.value) || 0;
  const cmax = parseFloat(clampMax.value) || 100;

  const rv = parseFloat(roundVal.value) || 0;
  const rdec = parseInt(roundDec.value) || 0;

  document.getElementById("out-math-clamp")!.textContent = String(
    clamp(cv, cmin, cmax)
  );
  document.getElementById("out-math-round")!.textContent = String(
    round(rv, rdec)
  );
  document.getElementById("out-math-random")!.textContent = String(
    random(1, 100)
  );
}

[clampVal, clampMin, clampMax, roundVal, roundDec].forEach((input) => {
  input.addEventListener("input", updateMathOutputs);
});
updateMathOutputs();

// --- 5. Date formatting & Leap Years ---
const dateRelativeSelect = document.getElementById(
  "date-relative-select"
) as HTMLSelectElement;
const dateLeapYear = document.getElementById(
  "date-leap-year"
) as HTMLInputElement;

function updateDateOutputs() {
  const secondsOffset = parseInt(dateRelativeSelect.value) || 0;
  const simulatedDate = new Date(Date.now() + secondsOffset * 1000);
  const year = parseInt(dateLeapYear.value) || 2026;

  document.getElementById("out-date-relative")!.textContent =
    relativeTime(simulatedDate);
  document.getElementById("out-date-leap")!.textContent = isLeapYear(year)
    ? `${year} is a Leap Year`
    : `${year} is NOT a Leap Year`;
}

dateRelativeSelect.addEventListener("change", updateDateOutputs);
dateLeapYear.addEventListener("input", updateDateOutputs);
updateDateOutputs();

// --- 6. Colors Converter ---
const colorHexInput = document.getElementById(
  "color-hex-input"
) as HTMLInputElement;
const colorBlock = document.getElementById("color-block");

function updateColorOutputs() {
  const hex = colorHexInput.value.trim();
  const rgb = hexToRgb(hex);

  if (rgb) {
    colorBlock!.style.backgroundColor = hex;
    document.getElementById("out-color-rgb")!.textContent =
      `RGB: { r: ${rgb.r}, g: ${rgb.g}, b: ${rgb.b} }`;
  } else {
    document.getElementById("out-color-rgb")!.textContent =
      "Invalid Hex color code";
  }
}

colorHexInput.addEventListener("input", updateColorOutputs);
updateColorOutputs();

// --- 7. Validation ---
const valEmailInput = document.getElementById(
  "val-email-input"
) as HTMLInputElement;
const valUrlInput = document.getElementById("val-url-input") as HTMLInputElement;
const valPhoneInput = document.getElementById("val-phone-input") as HTMLInputElement;
const valPasswordInput = document.getElementById("val-password-input") as HTMLInputElement;

function updateValidationOutputs() {
  const emailVal = valEmailInput.value.trim();
  const urlVal = valUrlInput.value.trim();
  const phoneVal = valPhoneInput.value.trim();
  const passwordVal = valPasswordInput.value.trim();

  const emailStatus = document.getElementById("out-val-email")!;
  if (isEmail(emailVal)) {
    emailStatus.className = "output-status status-valid";
    emailStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Valid Email';
  } else {
    emailStatus.className = "output-status status-invalid";
    emailStatus.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Invalid Email';
  }

  const urlStatus = document.getElementById("out-val-url")!;
  if (isUrl(urlVal)) {
    urlStatus.className = "output-status status-valid";
    urlStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Valid URL';
  } else {
    urlStatus.className = "output-status status-invalid";
    urlStatus.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Invalid URL';
  }

  const phoneStatus = document.getElementById("out-val-phone")!;
  if (isPhone(phoneVal)) {
    phoneStatus.className = "output-status status-valid";
    phoneStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Valid Phone';
  } else {
    phoneStatus.className = "output-status status-invalid";
    phoneStatus.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Invalid Phone';
  }

  const passwordStatus = document.getElementById("out-val-password")!;
  if (isStrongPassword(passwordVal)) {
    passwordStatus.className = "output-status status-valid";
    passwordStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Strong Password';
  } else {
    passwordStatus.className = "output-status status-invalid";
    passwordStatus.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Weak Password';
  }
}

valEmailInput.addEventListener("input", updateValidationOutputs);
valUrlInput.addEventListener("input", updateValidationOutputs);
valPhoneInput.addEventListener("input", updateValidationOutputs);
valPasswordInput.addEventListener("input", updateValidationOutputs);
updateValidationOutputs();

// --- 8. Async control flow ---
const debounceInput = document.getElementById(
  "async-debounce-input"
) as HTMLInputElement;
const btnThrottle = document.getElementById("btn-throttle-click");
const btnOnce = document.getElementById("btn-once-click");
const outDebounce = document.getElementById("out-async-debounce")!;
const outThrottle = document.getElementById("out-async-throttle")!;
const outOnce = document.getElementById("out-async-once")!;

// Debounced function (400ms delay)
const runDebounced = debounce((text: string) => {
  outDebounce.textContent = `Captured: "${text}"`;
}, 400);

debounceInput.addEventListener("input", () => {
  outDebounce.textContent = "Typing...";
  runDebounced(debounceInput.value);
});

// Throttled function (1s throttle)
let clickCount = 0;
const runThrottled = throttle(() => {
  clickCount++;
  outThrottle.textContent = `Executed count: ${clickCount}`;
}, 1000);

btnThrottle?.addEventListener("click", runThrottled);

// Once executor
const runOnce = once(() => {
  outOnce.textContent = "Executed! Subsequent clicks won't trigger.";
  outOnce.style.color = "#10b981";
});

btnOnce?.addEventListener("click", runOnce);

// --- 9. Crypto & Hashing ---
const cryptoHashInput = document.getElementById(
  "crypto-hash-input"
) as HTMLInputElement;
const btnGenUuid = document.getElementById("btn-gen-uuid");

function updateCryptoOutputs() {
  const text = cryptoHashInput.value;
  document.getElementById("out-crypto-hash")!.textContent = String(
    fnv1a(text)
  );
}

btnGenUuid?.addEventListener("click", () => {
  document.getElementById("out-crypto-uuid")!.textContent = uuid();
});

cryptoHashInput.addEventListener("input", updateCryptoOutputs);
document.getElementById("out-crypto-uuid")!.textContent = uuid();
updateCryptoOutputs();

// --- 10. safeStorage ---
const storageKeyInput = document.getElementById(
  "storage-key-input"
) as HTMLInputElement;
const storageValInput = document.getElementById(
  "storage-val-input"
) as HTMLInputElement;
const storageExpiryInput = document.getElementById(
  "storage-expiry-input"
) as HTMLInputElement;
const btnStorageWrite = document.getElementById("btn-storage-write");
const btnStorageRead = document.getElementById("btn-storage-read");
const storageLog = document.getElementById("out-storage-log")!;

let storageLogsArray: string[] = [];
function addStorageLog(msg: string) {
  storageLogsArray.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`);
  storageLog.textContent = storageLogsArray.join("\n");
}

btnStorageWrite?.addEventListener("click", () => {
  const key = storageKeyInput.value.trim();
  const rawVal = storageValInput.value;
  const expiry = parseInt(storageExpiryInput.value) || 0;

  safeStorage.setItem(key, rawVal, expiry);
  addStorageLog(`Wrote key "${key}" with val "${rawVal}" (expires in ${expiry}ms)`);
});

btnStorageRead?.addEventListener("click", () => {
  const key = storageKeyInput.value.trim();
  const val = safeStorage.getItem(key);

  if (val === null) {
    addStorageLog(`Read key "${key}" -> null (Expired or doesn't exist)`);
  } else {
    addStorageLog(`Read key "${key}" -> "${val}"`);
  }
});

// --- 11. EventEmitter Pub-Sub ---
const eventsPayloadInput = document.getElementById(
  "events-payload-input"
) as HTMLInputElement;
const btnEventsSub = document.getElementById("btn-events-subscribe");
const btnEventsEmit = document.getElementById("btn-events-emit");
const btnEventsClear = document.getElementById("btn-events-clear");
const eventsLog = document.getElementById("out-events-log")!;

const eventBus = new EventEmitter();
let eventsLogsArray: string[] = [];

function addEventsLog(msg: string) {
  eventsLogsArray.unshift(`[${new Date().toLocaleTimeString()}] ${msg}`);
  eventsLog.textContent = eventsLogsArray.join("\n");
}

let activeListener: ((data: string) => void) | null = null;
let listenerCount = 0;

btnEventsSub?.addEventListener("click", () => {
  if (activeListener) {
    addEventsLog("Already subscribed to 'notify' channel.");
    return;
  }

  listenerCount++;
  const id = listenerCount;
  activeListener = (data: string) => {
    addEventsLog(`Listener #${id} received payload: "${data}"`);
  };

  eventBus.on("notify", activeListener);
  addEventsLog(`Registered Listener #${id} for 'notify' event.`);
});

btnEventsEmit?.addEventListener("click", () => {
  const val = eventsPayloadInput.value + new Date().toLocaleTimeString();
  addEventsLog(`Emitting 'notify' event with payload...`);
  const success = eventBus.emit("notify", val);
  if (!success) {
    addEventsLog("Emitted event, but no active listeners were subscribed.");
  }
});

btnEventsClear?.addEventListener("click", () => {
  eventBus.clear();
  activeListener = null;
  addEventsLog("Cleared all listeners from Event Bus.");
});

// --- Click to Copy Install Command ---
const btnCopyInstall = document.getElementById("btn-copy-install");
btnCopyInstall?.addEventListener("click", () => {
  copyToClipboard("npm i @dev_x_mohit/opti-kit").then((success) => {
    if (success) {
      const copyIcon = btnCopyInstall.querySelector("i");
      if (copyIcon) {
        copyIcon.className = "fa-solid fa-check text-success";
        setTimeout(() => {
          copyIcon.className = "fa-regular fa-copy";
        }, 2000);
      }
    }
  });
});

// --- Subtab Toggles (Preview / Code Switcher) ---
document.querySelectorAll(".subtab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const parentCard = btn.closest(".card");
    if (!parentCard) return;

    const targetSubtab = btn.getAttribute("data-subtab");
    if (!targetSubtab) return;

    // Toggle active button
    parentCard.querySelectorAll(".subtab-btn").forEach((b) => {
      b.classList.remove("active");
    });
    btn.classList.add("active");

    // Toggle active content pane
    parentCard.querySelectorAll(".subtab-pane").forEach((pane) => {
      if (pane.getAttribute("data-subtab-pane") === targetSubtab) {
        pane.classList.add("active");
      } else {
        pane.classList.remove("active");
      }
    });
  });
});


