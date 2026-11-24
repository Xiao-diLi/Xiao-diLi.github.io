---
title: "Breaking the One-Billion-Toffoli Barrier for RSA-2048 via LLM-Driven Verifiable Quantum Compilation"
date: 2026-11-24
permalink: /posts/2026/11/rsa-2048-sub-billion-toffolis/
tags:
  - quantum computing
  - quantum compilation
  - Shor's algorithm
  - quantum AI
---

I am excited to share our team's latest preprint, [**Reducing RSA-2048 Factoring Resources Below One Billion Toffolis via LLM-Driven Verifiable Quantum Compilation**](https://arxiv.org/abs/2611.31158) (joint work with Yuqing Wang, Xue Chen, Yang-Yang Tang, Linghui Chen, and Tao Zhang).

## The Bottleneck in Quantum Factoring

Factoring 2048-bit RSA integers with Shor's algorithm has long faced a sharp space–time tradeoff. Full-width modular multiplication (Gidney & Ekerå, 2021) achieves roughly 2.7 billion Toffoli gates but requires around 6,200 logical qubits. Recent approximate residue number system (RNS) architectures (Chevignard, Fouque & Schrottenloher, 2025; Gidney, 2025) dramatically compress logical space down to roughly 1,400–1,860 qubits—bringing physical estimates below one million qubits—yet pay a heavy gate-count penalty of 4.5–11 billion Toffolis because thousands of small primes are processed serially.

Can we keep the compact qubit footprint of RNS factoring while slashing its gate count?

## Key Results

By combining **LLM-driven cross-stage circuit discovery** with **analytical error certificates** and **bit-level formal verification**, we built a deterministic compiler that produces a 30-point Pareto frontier of RSA-2048 circuits across **1,306 to 2,919 logical qubits**:

- **First sub-billion-Toffoli RSA-2048 factoring:** Our frontier reaches **0.978 billion expected Toffolis** at **2,433 logical qubits** (cutting the minimum qubit–Toffoli product by **70.1%** relative to Gidney's 2025 baseline), **0.961 billion** at **2,485 qubits** (**−78.6%** at matched 33-bit accumulator precision), and **0.932 billion** at **2,919 qubits** with one extra accumulator qubit (**−79.2%**). This improves simultaneously in *both* logical qubits and Toffoli count over full-width multiplication.
- **Lower minimum qubit count:** At the low-space end, our compiler reaches **1,306 logical qubits** under identical clean-ancilla accounting (below the 1,323-qubit clean-ancilla baseline).

## What Made the Difference

Rather than tuning isolated arithmetic subroutines, the biggest gains came from **co-designing all four stages of the RNS pipeline** so that each exponent-window QROM lookup can be shared across batches of up to 24 primes without exploding ancilla overhead:

1. **Cross-stage representation alignment:** Shifting centered 26–27 bit discrete-logarithm sums into offset unsigned lanes enables strictly in-place mod (*p* − 1) non-restoring division that exploits the trailing zeros of *p* − 1, cutting Stage-(ii) division cost by more than half. At the end of the pipeline, mapping CRT slices onto a dyadic torus mod 2<sup>*f*</sup> uses natural binary overflow, eliminating the borrow qubit and comparator while reducing Stage-(iv) Toffolis by 45%.
2. **Localized measurement-based uncomputation:** A *rolling algebraic-normal-form (ANF)* lookup streams values across batched lanes using a single output register and immediately cleans up measurement phases with Clifford gates inside each window—decoupling scratch space from batch size and eliminating deferred global phase cleanup.
3. **Verification beyond random simulation:** Compressing registers to 26 bits introduces rare wraparound events near probability 10<sup>−10</sup> that random sampling cannot catch. We certify these tails analytically via float-free integer MGF bounds (and universal Hoeffding bounds at 27 bits), and dual-verify six representative full-width circuits across all **119,482 constituent 20-bit prime evaluations** (3.14 TB of gate streams) using exact symbolic tracking over all 2<sup>*M*</sup> mid-circuit measurement outcomes alongside randomized *kickmix* replay.

## Looking Ahead

Beyond RSA-2048, we view this work as a practical blueprint for **LLM-driven verifiable compilation** at full fault-tolerant algorithm scale: pairing automated cross-stage search with analytical error bounds, symbolic measurement-phase tracking, and deterministic bit-level verification.

- **Paper:** [arXiv:2611.31158](https://arxiv.org/abs/2611.31158)
- **Code & Verification Artifacts:** [GitHub Repository](https://github.com/ZhangTao1999/LLM-Driven-Verifiable-Quantum-Compilation-for-RSA)
