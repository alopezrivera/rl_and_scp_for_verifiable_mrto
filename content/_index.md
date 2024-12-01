---
title: "Design And Optimization Of Multi-Rendezvous Manoeuvres Based On Reinforcement Learning And Convex Optimization"
description: "Solving multi-rendezvous spacecraft guidance problems, with strict feasibility guarantees"
keywords: "Trajectory Optimization, On-Orbit Servicing, Reinforcement Learning, Sequential Convex Programming"
venue:
  name: "75<sup>th</sup> International Astronautical Congress, 2024"
  website: "https://www.iac2024.org"
authors:
  - name: "Antonio López Rivera"
    website: "https://www.linkedin.com/in/alopezrivera/"
    affiliation: "1,2"
  - name: "Lucrezia Marcovaldi"
    affiliation: "2"
  - name: "Jesús Ramírez"
    affiliation: "2"
  - name: "Alex Cuenca"
    affiliation: "2"
  - name: "David Bermejo"
    affiliation: "2"
affiliations: "<sup>1</sup>Delft University of Technology, <sup>2</sup>Sener Aerospace & Defence"
links:
  - url: "https://arxiv.org/pdf/2411.11778"
    icon: "fas fa-file-pdf"
    text: "Preprint"
  - url: "https://dl.iafastro.directory/event/IAC-2024/paper/87909/"
    icon: "fas fa-book"
    text: "Proceedings"
bibFile: data/bib.json
---

{{< figure src="media/cover/final.png" alt="Artistic representation of the cis-lunar logistical environment" caption="Image created with the assistance of DALL·E 2" >}}

{{< abstract >}}

<h4 class="subtitle has-text-centered">
  We present a framework for solving multi-rendezvous spacecraft guidance problems with strict feasibility guarantees.
</h4>

# Abstract

Optimizing space vehicle routing is crucial for critical applications such as on-orbit servicing,
constellation deployment, and space debris de-orbiting. Multi-target Rendezvous presents a
significant challenge in this domain. This problem involves determining the optimal sequence
in which to visit a set of targets, and the corresponding optimal trajectories: this results in
a demanding NP-hard problem. We introduce a framework for the design and refinement of
multi-rendezvous trajectories based on heuristic combinatorial optimization and Sequential
Convex Programming. Our framework is both highly modular and capable of leveraging
candidate solutions obtained with advanced approaches and handcrafted heuristics. We
demonstrate this flexibility by integrating an Attention-based routing policy trained with
Reinforcement Learning to improve the performance of the combinatorial optimization
process. We show that Reinforcement Learning approaches for combinatorial optimization
can be effectively applied to spacecraft routing problems. We apply the proposed framework
to the UARX Space OSSIE mission: we are able to thoroughly explore the mission design
space, finding optimal tours and trajectories for a wide variety of mission scenarios.

{{< /abstract >}}

# Mission

Orbit Solutions to Simplify Injection and Exploration (OSSIE) is a modular Orbit Transfer Vehicle by [UARX Space](https://www.uarx.com), designed to deliver multiple payloads—including PocketQubes, CubeSats, and small satellites—to Low Earth Orbit. It operates using four [Dawn Aerospace](https://www.dawnaerospace.com) B20 bi-propellant thrusters, and is capable of multi-revolution impulsive manoeuvers. In this work we present the guidance system developed for OSSIE. The goal of the guidance system is to determine strictly feasible trajectories that minimize fuel consumption for multiple payload deployment missions, accounting for all factors that impact trajectory feasibility and cost. Most importantly: gravity gradient perturbations, the impact of mass deployment sequence on propellant usage, and constraints on insertion and decommissioning orbits.

{{< figure src="media/OSSIE.png" alt="UARX Space OSSIE Orbit Transfer Vehicle" caption="UARX Space OSSIE Orbit Transfer Vehicle. Refer to the [official UARX Space OSSIE information page](https://www.uarx.com/projects/ossie.php) for up to date information and commercial operations. Credit: UARX Space." width=0.5 >}}

# Guidance Framework

We propose a modular solver architecture with a three-stage pipeline: heuristic optimization, trajectory re-optimization, and verification. The heuristic optimization stage determines optimal target sequences, integrating arbitrary hand-crafted and advanced solvers—exact or learned—through distance-based permutation sampling. The trajectory re-optimization stage refines these sequences to generate feasible and near-optimal trajectories, and the verification stage ensures compliance with mission requirements.

{{< figure src="media/solver_arch.png" alt="Solver architecture" caption="STSP solver architecture. In black: complex components (integrated using standardized interfaces) the internal structure of which is out of the scope of this diagram." >}}

# Neural Combinatorial Optimization for Multi-Rendezous Spacecraft Guidance

An attention-based routing policy was implemented for the OSSIE mission's Space Traveling Salesman Problem. The policy consists of an encoder-decoder network first introduced by [Kool et al. (2015)](https://arxiv.org/abs/1803.08475) and is trained via Reinforcement Learning (RL). The [`RL4CO` Neural Combinatorial Optimization library](https://rl4.co) was used to implement and train the policy using the REINFORCE, Advantage Actor-Critic, and Proximal Policy Optimization RL algorithms on 100,000 ten-transfer mission scenarios. 

{{< figure src="media/network_architecture.png" alt="Network architecture" caption="Architecture of the autoregressive, attention-based policy used in this work. The encoder comprises a fully connected network and a Graph Attention Network (GAT) with a feedforward layer. Edge embeddings are omitted as the STSP graph is fully connected. The decoder constructs at each step a context embedding $\mathbf{Q}$ used as the query for the Pointer Network (PN) attention mechanism. This diagram is based on the general `RL4CO` policy architecture diagram by [Berto et al. (2024)](https://arxiv.org/abs/2306.17100). Refer to [Kool et al. (2015)](https://arxiv.org/abs/1803.08475) and Vinyals et al. (2017) [Vinyals, Fortunato and Jaitly (2017)](http://arxiv.org/abs/1506.03134) for more information about the internal structure of the GATs and PNs." >}}

REINFORCE provided the best performance, achieving a mean optimality gap of 3.02% compared to heuristic solutions when employing Beam Search. While this performance is significant, it may not directly generalize to fully dynamic STSPs due to the near-static nature of the problem without RAAN targeting. However, the results are promising for future research on spacecraft autonomy in multi-rendezvous missions using Neural Combinatorial Optimization methods.

{{< figure src="media/rl_perf.png" alt="Policy training curve" caption="Validation reward curve (expressed as a mean optimality gap with respect to the solutions obtained using Heuristic Combinatorial Optimization) with REINFORCE, A2C and PPO." width=0.5 >}}

# Mission Analysis

A Monte Carlo analysis of 5,000 mission scenarios was performed using OSSIE's nominal payload list. The study concluded that fuel consumption and mission cost are mainly influenced by the number of payload bundles and the inclination range. In all cases, OSSIE is capable of completing its mission and decommissioning sequence.

The Sequential Convex Programming (SCP) algorithm was validated for trajectory re-optimization, successfully adapting transfer manoeuvers to spacecraft constraints with minimal impact on injection errors or $\Delta V$. In non-coplanar scenarios, SCP reduced propellant consumption by 8.5% compared to the combinatorial approximation, although complete eccentricity elimination was not achieved.

Verification in a high-fidelity simulator confirmed that the optimized trajectories meet mission requirements. Additional $\Delta V$ was observed in simulations due to pointing correction manoeuvers, as the spacecraft uses Dawn Aerospace B1 thrusters for attitude control. Total transfer cost remained feasible for OSSIE.

{{< figure src="media/pairplot.png" alt="Mission cost in fuel mass, delta V and TOF, as a function of number of bundles, inclination range and standard deviation, and semi-major axis range and standard deviation" caption="Mission cost in fuel mass, delta V and TOF, as a function of number of bundles, inclination range and standard deviation, and semi-major axis range and standard deviation" >}}

# Conclusion

An optimization framework for the Multi-target Rendezvous problem has been developed and applied to the UARX Space OSSIE mission. It determines optimal target sequences and near fuel-optimal trajectories, integrating a Reinforcement Learning-trained Attention-based routing policy. The framework accommodates OSSIE's propulsion requirements, adapts to mission constraints, and supports future extensions.

# Acknowledgements

This work is the result of a collaborative effort between the [Delft University of Technology](https://www.tudelft.nl/en/ae) and [SENER Aerospace & Defence](https://www.group.sener/en/markets/aerospace/). We would like to thank Marc Naeije from TU Delft for his endorsement of the project and for his keen supervision and advice. We would like to extend our gratitude to Mercedes Ruiz for making this research possible at Sener Aerospace & Defence. Lastly, we thank UARX Space for entrusting us with OSSIE's maiden flight, the first of many missions to come. Ad astra.

```bibtex
@inproceedings{lopez_rivera_design_2024,
	title = {Design and {Optimization} of {Multi}-{Rendezvous} {Maneuvres} based on {Reinforcement} {Learning} and {Convex} {Optimization}},
	url = {https://dl.iafastro.directory/event/IAC-2024/paper/87909/},
	booktitle = {Proceedings of the 75th {International} {Astronautical} {Congress}},
	publisher = {International Astronautical Federation},
	author = {López Rivera, Antonio and Marcovaldi, Lucrezia and Ramírez Sánchez, Jesús Fernando and Alex, Cuenca and David, Bermejo},
	year = {2024},
	pages = {18},
}
```