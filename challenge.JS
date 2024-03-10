document.addEventListener('DOMContentLoaded', function () {
    fetch('challenge.JSON')
        .then(response => response.json())
        .then(data => {
            const mainElement = document.querySelector('#challenge-content');

            const challengeTitle = document.createElement('h1');
            challengeTitle.textContent = data.challengeName;
            mainElement.appendChild(challengeTitle);

            const challengeDesc = document.createElement('p');
            challengeDesc.textContent = data.description;
            mainElement.appendChild(challengeDesc);

            function addStepsToMainElement(steps, techniqueName) {
                const section = document.createElement('section');
                const heading = document.createElement('h2');
                heading.textContent = techniqueName;
                section.appendChild(heading);

                steps.forEach((step, index) => {
                    const card = document.createElement('div');
                    card.className = 'card';

                    const cardHeader = document.createElement('div');
                    cardHeader.className = 'card-header';
                    cardHeader.id = `heading${index}`;
                    cardHeader.innerHTML = `<h5 class="mb-0">
                                              <button class="btn btn-link" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                                Step ${step.step}
                                              </button>
                                            </h5>`;
                    card.appendChild(cardHeader);

                    const collapse = document.createElement('div');
                    collapse.id = `collapse${index}`;
                    collapse.className = 'collapse show';
                    collapse.setAttribute('aria-labelledby', `heading${index}`);
                    collapse.setAttribute('data-parent', '#challenge-content');

                    const cardBody = document.createElement('div');
                    cardBody.className = 'card-body';
                    cardBody.textContent = step.description;

                    if (step.image) {
                        const stepImage = document.createElement('img');
                        stepImage.src = `./images/${step.image}`;
                        stepImage.alt = `Image for Step ${step.step}`;
                        stepImage.className = 'img-fluid';
                        cardBody.appendChild(stepImage);
                    }

                    collapse.appendChild(cardBody);
                    card.appendChild(collapse);

                    section.appendChild(card);
                });

                mainElement.appendChild(section);
            }

            addStepsToMainElement(data.cleanTechniqueSteps, 'Clean Technique');
            addStepsToMainElement(data.jerkTechniqueSteps, 'Jerk Technique');
        })
        .catch(error => console.error('Error loading challenge details:', error));
});