# AI-Thos
AI-Thos is an Agentic Moral Engine powered by LLAMA 3.3 which can analyze ethical dilemmas and scenario and suggest ethical outcomes for them based on different moral frameworks.

We have used AI Agents with an LLM as the backbone for the creation of the following entities as an agent:

- Utilitarian Ethics Philosopher
- Deontological Ethics Philosopher
- Virtue Ethics Philosopher
- Opportunistic Human Being
- Human Being with User Defined Traits
- Questionnaire Expert
- Personality Analysis Expert
- Socially Responsible News Reporter

A web interface for the user is available to give a scenario and use a custom framework to get a response and simulate all possible decisions using rationale from the moral frameworks or from the perspective of an opportunistic human by leveraging the Philosopher Agents and Human Being Agents.

A questionnaire interface for users to choose their decisions from randomly generated 15 questions and decisions using the Questionnaire Expert Agent and give an overall personality analysis based on the three moral frameworks using the Personality Analysis Expert Agent.

The implementation of real-time decision-making using data inputs from live news events and generated ethically correct outcomes and corrective measures through the Socially Responsible News Reporter Agent has been done as well.

## Model Details
Model: Llama-3.3-70B-Instruct
We have used a serverless inference API by Together AI which has the following advantages:

- It has a latency of 2.5-3.0 seconds per query
- It is instruction-tuned, making it suitable for AI Agents
- The model is open-source.
- The endpoint used is free-tier with no response limits, making it more scalable

## Benchmarks
We have benchmarked our model on the ETHICS dataset, a common standard for evaluating the ethical nature of LLMs. The dataset consisted of examples from three separate moral frameworks in the problem statements.\
We have achieved the follwing metrics on the overall randomly stratified sliced dataset:-

    F1-Score = 0.856 
    Matthews Correlation Coefficient (MCC) = 0.721

## Future Scope
- Latency improvement of the model
- Use of quantized model for CPU inferencing
- Edge device deployment
- Extension of the realtime scenario to autonomous vehicles

## Run Locally
Clone the project

```bash
  git clone "https://github.com/vibhanshushrm2025/AI-Thos.git"
```

Go to the project directory

```bash
  cd AI-Thos
```

Install dependencies

```bash
  pip install -r requirements.txt
  cd WEB/backend
  npm i
  npm run dev
  cd ../frontend
  npm i
  npm run dev
```

```bash
  streamlit run src/app.py
```


## References
    @article{hendrycks2021ethics,
      title={Aligning AI With Shared Human Values},
      author={Dan Hendrycks and Collin Burns and Steven Basart and Andrew Critch and Jerry Li and Dawn Song and Jacob Steinhardt},
      journal={Proceedings of the International Conference on Learning Representations (ICLR)},
      year={2021}
    }

    @inproceedings{hong2024metagpt,
        title={Meta{GPT}: Meta Programming for A Multi-Agent Collaborative Framework},
        author={Sirui Hong and Mingchen Zhuge and Jonathan Chen and Xiawu Zheng and Yuheng Cheng and Jinlin Wang and Ceyao Zhang and Zili Wang and Steven Ka Shing Yau and Zijuan Lin and Liyang Zhou and Chenyu Ran and Lingfeng Xiao and Chenglin Wu and J{\"u}rgen Schmidhuber},
        booktitle={The Twelfth International Conference on Learning Representations},
        year={2024},
        url={https://openreview.net/forum?id=VtmBAGCN7o}
    }
    @misc{hong2024data,
        title={Data Interpreter: An LLM Agent For Data Science}, 
        author={Sirui Hong and Yizhang Lin and Bang Liu and Bangbang Liu and Binhao Wu and Danyang Li and Jiaqi Chen and Jiayi Zhang and Jinlin Wang and Li Zhang and Lingyao Zhang and Min Yang and Mingchen Zhuge and Taicheng Guo and Tuo Zhou and Wei Tao and Wenyi Wang and Xiangru Tang and Xiangtao Lu and Xiawu Zheng and Xinbing Liang and Yaying Fei and Yuheng Cheng and Zongze Xu and Chenglin Wu},
        year={2024},
        eprint={2402.18679},
        archivePrefix={arXiv},
        primaryClass={cs.AI}
    }
    @misc{zhang2024aflow,
        title={AFlow: Automating Agentic Workflow Generation}, 
        author={Jiayi Zhang and Jinyu Xiang and Zhaoyang Yu and Fengwei Teng and Xionghui Chen and Jiaqi Chen and Mingchen Zhuge and Xin Cheng and Sirui Hong and Jinlin Wang and Bingnan Zheng and Bang Liu and Yuyu Luo and Chenglin Wu},
        year={2024},
        eprint={2410.10762},
        archivePrefix={arXiv},
        primaryClass={cs.AI},
        url={https://arxiv.org/abs/2410.10762}, 
    }
    
