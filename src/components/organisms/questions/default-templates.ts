export const defaultTemplates = {
  python: {
    template: "def solve():\n    # Write your solution here\n    pass\n",
    solutionCode: "def solve():\n    return True\n"
  },
  javascript: {
    template: "function solve() {\n  // Write your solution here\n}\n",
    solutionCode: "function solve() {\n  return true;\n}\n"
  },
  typescript: {
    template: "function solve(): void {\n  // Write your solution here\n}\n",
    solutionCode: "function solve(): boolean {\n  return true;\n}\n"
  },
  java: {
    template: "public class Solution {\n    public static void solve() {\n        // Write your solution here\n    }\n}\n",
    solutionCode: "public class Solution {\n    public static void solve() {\n        return;\n    }\n}\n"
  },
  'c++': {
    template: "#include <iostream>\n\nvoid solve() {\n    // Write your solution here\n}\n\nint main() {\n    solve();\n    return 0;\n}\n",
    solutionCode: "#include <iostream>\n\nvoid solve() {\n    // Sample solution\n}\n\nint main() {\n    solve();\n    return 0;\n}\n"
  },
  c: {
    template: "#include <stdio.h>\n\nvoid solve() {\n    // Write your solution here\n}\n\nint main() {\n    solve();\n    return 0;\n}\n",
    solutionCode: "#include <stdio.h>\n\nvoid solve() {\n    // Sample solution\n}\n\nint main() {\n    solve();\n    return 0;\n}\n"
  },
  'c#': {
    template: "public class Solution {\n    public static void Solve() {\n        // Write your solution here\n    }\n}\n",
    solutionCode: "public class Solution {\n    public static bool Solve() {\n        return true;\n    }\n}\n"
  },
  go: {
    template: "package main\n\nimport \"fmt\"\n\nfunc solve() {\n    // Write your solution here\n}\n\nfunc main() {\n    solve()\n}\n",
    solutionCode: "package main\n\nimport \"fmt\"\n\nfunc solve() bool {\n    return true\n}\n\nfunc main() {\n    fmt.Println(solve())\n}\n"
  },
  rust: {
    template: "fn solve() {\n    // Write your solution here\n}\n\nfn main() {\n    solve();\n}\n",
    solutionCode: "fn solve() -> bool {\n    true\n}\n\nfn main() {\n    println!(\"{}\", solve());\n}\n"
  },
  ruby: {
    template: "def solve\n  # Write your solution here\nend\n",
    solutionCode: "def solve\n  true\nend\n"
  },
  swift: {
    template: "func solve() {\n    // Write your solution here\n}\n",
    solutionCode: "func solve() -> Bool {\n    return true\n}\n"
  },
  kotlin: {
    template: "fun solve() {\n    // Write your solution here\n}\n",
    solutionCode: "fun solve(): Boolean {\n    return true\n}\n"
  },
  php: {
    template: "<?php\nfunction solve() {\n    // Write your solution here\n}\n?>\n",
    solutionCode: "<?php\nfunction solve() {\n    return true;\n}\n?>\n"
  }
};
