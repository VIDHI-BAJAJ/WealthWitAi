import matplotlib.pyplot as plt
def plot_predictions(actual, predicted, save_path=None):
    plt.figure(figsize=(14, 7))
    plt.plot(actual, label='Actual')
    plt.plot(predicted, label='Predicted')
    plt.legend()
    if save_path:
        plt.savefig(save_path)  # Save plot to file
    plt.show()
# def plot_predictions(actual, predicted):
#     plt.figure(figsize=(14, 7))
#     plt.plot(actual, label='Actual')
#     plt.plot(predicted, label='Predicted')
#     plt.legend()
#     plt.show()