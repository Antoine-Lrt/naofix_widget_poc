# 📦 Widget – Size & Column Behavior

Each widget can have multiple variants depending on the device:

- **Desktop** → up to 4 variants based on column width
- **Tablet** → up to 4 variants based on column width
- **Mobile** → 1 fixed variant

---

## 📐 Available Column Widths

The layout uses four column sizes:

| Size | Label      | Description           |
| ---- | ---------- | --------------------- |
| `xs` | ExtraSmall | Very narrow column    |
| `sm` | Small      | Standard small column |
| `md` | Medium     | Medium-sized column   |
| `lg` | Large      | Large column          |

---

## 🔧 Widget Compatibility Rules

- **Desktop**: the selected variant depends on the column width.  
  Example: if the column is `sm`, the Desktop "Small" widget is used. If `lg`, Desktop "Large" is used.
- **Tablet / Mobile**: the widget has a single variant that automatically adapts to the column.

> 🔒 If the column is smaller than the widget's minimum required width, it cannot be added to that column.

---

## 🧱 Practical Example

| Column | Desktop variant loaded | Tablet variant    | Mobile variant |
| ------ | ---------------------- | ----------------- | -------------- |
| xs     | Desktop ExtraSmall     | Tablet ExtraSmall | Mobile         |
| sm     | Desktop Small          | Tablet Small      | Mobile         |
| md     | Desktop Medium         | Tablet Medium     | Mobile         |
| lg     | Desktop Large          | Tablet Large      | Mobile         |

---

## 📝 Summary

- Each widget can support **multiple Desktop variants**, but only **one Mobile variant** is needed.
- The layout automatically loads the correct variant **based on the column width and device**.
- This system allows for a **flexible**, **responsive**, and **easy-to-maintain** layout.
